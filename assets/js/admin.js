/**
 * 360 Quality Solutions | static client-side business workspace.
 * This is not an authenticated admin portal: drafts persist only in this browser.
 */
(() => {
  'use strict';
  const KEY_DOCS = '360qs_documents_v1';
  const KEY_BUSINESS = '360qs_business_v1';
  const DEFAULT_BUSINESS = Object.freeze({
    businessName:'360 Quality Solutions', businessEmail:'shibeRR@gmail.com',
    businessPhone:'+27 76 286 939', businessAddress:'Ditsela Place, Jan Shoba Street\nHatfield, Pretoria, 0028',
    vatNumber:'', bankName:'', accountName:'', accountNumber:'', branchCode:''
  });
  const labels = { dashboard:'Overview',invoice:'Invoices',quote:'Quotations',documents:'Saved documents',settings:'Business settings' };
  const el = id => document.getElementById(id);
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const cleanText = (v) => String(v ?? '').trim();
  const safe = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const shiftDate = (date, days) => {const d = new Date((date || today())+'T12:00:00'); d.setDate(d.getDate()+days); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const niceDate = (raw) => raw ? new Date(raw+'T12:00:00').toLocaleDateString('en-ZA',{day:'2-digit',month:'short',year:'numeric'}) : 'Not specified';
  const cents = n => Math.round((Number(n) || 0)*100);
  const zar = n => 'R '+(Number(n) || 0).toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});
  function readJSON(key, fallback) { try {const s=localStorage.getItem(key); const v=s?JSON.parse(s):fallback; return v ?? fallback;} catch {return fallback;} }
  function writeJSON(key, value) {try {localStorage.setItem(key,JSON.stringify(value)); return true;} catch {toast('Unable to save: browser storage is unavailable or full. Download your PDF for a copy.');return false;}}
  let business = {...DEFAULT_BUSINESS,...readJSON(KEY_BUSINESS,{})};
  let savedDocs = readJSON(KEY_DOCS,[]);
  if (!Array.isArray(savedDocs)) savedDocs=[];
  savedDocs = savedDocs.filter(x=>x && (x.type==='invoice'||x.type==='quote'));
  let activeType='invoice'; let currentView='dashboard'; let zoomFactor=1; let toastTimer;
  const drafts={invoice:null,quote:null};
  function nextNumber(type) {
    const prefix = type==='invoice'?'INV':'QUO'; const year = new Date().getFullYear();
    const used = savedDocs.map(d=>String(d.number||'')).filter(n=>n.startsWith(`${prefix}-${year}-`)).map(n=>Number(n.split('-').at(-1))).filter(Number.isFinite);
    return `${prefix}-${year}-${String(Math.max(0,...used)+1).padStart(3,'0')}`;
  }
  function makeDoc(type) {
    const issueDate=today();
    return {id:null,type,number:nextNumber(type),status:'draft',issueDate,dueDate:shiftDate(issueDate,type==='invoice'?14:30),
      clientName:'',clientContact:'',clientEmail:'',clientAddress:'',reference:'',
      items:[{description:'Professional consulting services',detail:'',qty:1,rate:0}],discountRate:0,taxRate:0,
      notes:'',terms:type==='invoice'?'Payment is due by the date stated on this invoice. Please reference the invoice number when making payment.':'This quotation is valid until the date indicated. Scope changes may require a revised quotation.'};
  }
  function current() {if(!drafts[activeType]) drafts[activeType]=makeDoc(activeType);return drafts[activeType];}
  function totals(doc) {const items = Array.isArray(doc.items)?doc.items:[]; const subtotalC=items.reduce((sum,i)=>sum+Math.round((Number(i.qty)||0)*(Number(i.rate)||0)*100),0); const discountC=Math.round(subtotalC*Math.max(0,Math.min(100,Number(doc.discountRate)||0))/100); const taxableC=Math.max(0,subtotalC-discountC); const taxC=Math.round(taxableC*Math.max(0,Math.min(100,Number(doc.taxRate)||0))/100);return {subtotal:subtotalC/100,discount:discountC/100,tax:taxC/100,total:(taxableC+taxC)/100};}
  function toast(message) {const t=el('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),4300);}
  function statusOptions(type) {return type==='invoice'?[['draft','Draft'],['issued','Issued'],['paid','Paid'],['cancelled','Cancelled']]:[['draft','Draft'],['sent','Sent'],['accepted','Accepted'],['declined','Declined']];}
  function nav(view) {
    currentView=view; const section = ['invoice','quote'].includes(view)?'editor':view;
    for(const s of ['dashboard','editor','documents','settings']) el('section-'+s).classList.toggle('hidden',s!==section);
    $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
    el('breadcrumb').textContent=labels[view]||'Overview';
    el('sidebar').classList.remove('open');el('sidebar-overlay').classList.remove('show');
    if(view==='invoice'||view==='quote'){activeType=view; renderEditor();} else if(view==='documents'){renderDocuments();} else if(view==='dashboard'){renderDashboard();} else if(view==='settings'){renderSettings();}
    window.scrollTo({top:0,behavior:'instant'});
  }
  function newDoc(type=activeType) {drafts[type]=makeDoc(type);nav(type);toast('New '+(type==='invoice'?'invoice':'quotation')+' ready to edit.');}
  function renderEditor() {
    const doc=current(), invoice=activeType==='invoice';
    el('editor-title').textContent=invoice?'Invoice studio':'Quotation studio';
    el('editor-subtitle').textContent=invoice?'Prepare accurate billing with a live A4 invoice.':'Build a clear, confident client quotation.';
    el('deadline-label').textContent=invoice?'Payment due date':'Valid until';
    el('terms-label').textContent=invoice?'Payment terms':'Quotation terms';
    el('doc-status').innerHTML=statusOptions(activeType).map(([v,label])=>`<option value="${v}">${label}</option>`).join('');
    const form=el('document-form');
    for(const field of ['number','status','issueDate','dueDate','clientName','clientContact','clientEmail','clientAddress','reference','discountRate','taxRate','notes','terms']) {
      const target = form.elements.namedItem(field);if(target) target.value=doc[field]??'';
    }
    renderItemEditors();renderPreview();
  }
  function renderItemEditors() {
    const doc=current();
    el('line-item-editors').innerHTML=doc.items.map((item,index)=>`<div class="line-editor" data-index="${index}"><div class="line-editor-header"><b>SERVICE ${String(index+1).padStart(2,'0')}</b><button type="button" class="line-remove" data-remove-item="${index}" aria-label="Remove line item ${index+1}" title="Remove item"><svg class="ico"><use href="#i-trash"/></svg></button></div><div class="line-fields"><label class="field line-description"><span>Service / description</span><input type="text" data-item="${index}" data-prop="description" maxlength="240" value="${safe(item.description)}" placeholder="e.g. ISO 9001 gap analysis"></label><label class="field line-description"><span>Scope / details (optional)</span><input type="text" data-item="${index}" data-prop="detail" maxlength="250" value="${safe(item.detail)}" placeholder="Short deliverable or service detail"></label><label class="field"><span>Quantity</span><input type="number" data-item="${index}" data-prop="qty" min="0" max="100000" step="0.01" value="${safe(item.qty)}"></label><label class="field"><span>Unit rate (ZAR)</span><input type="number" data-item="${index}" data-prop="rate" min="0" max="100000000" step="0.01" value="${safe(item.rate)}"></label></div><div class="line-amount">Line total: <b>${zar((Number(item.qty)||0)*(Number(item.rate)||0))}</b></div></div>`).join('');
  }
  function setText(id,v) {el(id).textContent=v;}
  function renderPreview() {
    const doc=current(), inv=doc.type==='invoice', sum=totals(doc);
    setText('preview-doc-type',inv?'INVOICE':'QUOTATION');setText('preview-doc-number',doc.number||'—');setText('preview-status',String(doc.status||'draft').toUpperCase());
    setText('preview-client-name',doc.clientName||'Client / company name');
    setText('preview-client-email',doc.clientEmail||'Client email address');
    setText('preview-client-contact',doc.clientContact||'');el('preview-client-contact').classList.toggle('hidden',!doc.clientContact);
    setText('preview-client-address',doc.clientAddress||'Client address');
    setText('preview-issue-date',niceDate(doc.issueDate));setText('preview-due-date',niceDate(doc.dueDate));
    setText('preview-date-label',inv?'Due date':'Valid until');setText('preview-reference',doc.reference||'—');
    setText('preview-table-heading',inv?'SERVICES PROVIDED':'SCOPE & FEES');
    el('preview-lines').innerHTML=doc.items.map(i=>`<tr><td>${safe(i.description)||'Service description'}${i.detail?`<small>${safe(i.detail)}</small>`:''}</td><td>${Number(i.qty)||0}</td><td>${zar(i.rate)}</td><td>${zar((Number(i.qty)||0)*(Number(i.rate)||0))}</td></tr>`).join('');
    setText('preview-subtotal',zar(sum.subtotal));setText('preview-discount',`− ${zar(sum.discount)}`);setText('preview-discount-title',`Discount (${Number(doc.discountRate)||0}%)`);setText('preview-tax',zar(sum.tax));
    setText('preview-tax-title',`VAT (${Number(doc.taxRate)||0}%)`);setText('preview-total',zar(sum.total));setText('preview-total-label',inv?'TOTAL DUE':'TOTAL QUOTED');
    el('preview-discount-row').classList.toggle('hidden',!Number(doc.discountRate));el('preview-tax-row').classList.toggle('hidden',!Number(doc.taxRate));
    setText('preview-terms-title',inv?'PAYMENT TERMS':'QUOTATION TERMS');setText('preview-notes',doc.notes||'Thank you for considering 360 Quality Solutions.');setText('preview-terms',doc.terms||'—');
    setText('preview-footer-address',String(business.businessAddress||'').replace(/\n/g,' · '));
    setText('preview-footer-contact',[business.businessEmail,business.businessPhone].filter(Boolean).join(' · '));
    el('preview-payments').classList.toggle('hidden',!inv);el('preview-acceptance').classList.toggle('hidden',inv);
    const bank = [[business.bankName,'Bank'],[business.accountName,'Account name'],[business.accountNumber,'Account no.'],[business.branchCode,'Branch code']].filter(([v])=>cleanText(v));
    setText('preview-bank-details',bank.length?bank.map(([value,label])=>`${label}: ${value}`).join('  ·  '):'Banking details provided on request.');
    // Update live logo wordmark/business identity without altering artwork.
    const docBrand=$('.doc-brand strong');docBrand.textContent=String(business.businessName||'360 QUALITY SOLUTIONS').toUpperCase();
    $('.doc-brand span').textContent='QUALITY SOLUTIONS';
    requestAnimationFrame(scalePaper);
  }
  function scalePaper() {
    if(currentView!=='invoice'&&currentView!=='quote') return;
    const stage=el('paper-stage'), wrap=el('paper-scaler'), page=el('document-page');
    const avail=Math.max(260,stage.clientWidth-28);const base=Math.min(1,avail/794);
    const scale=Math.max(.32,Math.min(1.5,base*zoomFactor));
    wrap.style.width=(794*scale)+'px';wrap.style.height=(page.scrollHeight*scale)+'px';
    page.style.transform=`scale(${scale})`;setText('zoom-value',Math.round(scale*100)+'%');
    stage.style.overflowX=(794*scale>avail+5)?'auto':'hidden';
  }
  function persistDoc() {
    const doc=current();
    if(!cleanText(doc.number)){toast('Enter a document number before saving.');$('#document-form [name="number"]').focus();return;}
    if(savedDocs.some(d=>d.number===doc.number && d.id!==doc.id)){toast('This document number already exists. Please use a unique number.');return;}
    const saved = (typeof structuredClone === "function") ? structuredClone(doc) : JSON.parse(JSON.stringify(doc));
    saved.id=saved.id||('doc-'+Date.now()+'-'+Math.random().toString(16).slice(2,8)); saved.savedAt=new Date().toISOString();
    const prior=savedDocs.findIndex(d=>d.id===saved.id);
    const next=[...savedDocs];if(prior>=0) next[prior]=saved;else next.push(saved);
    if(writeJSON(KEY_DOCS,next)){savedDocs=next;drafts[activeType]=saved;updateCount();toast('Saved '+(activeType==='invoice'?'invoice':'quotation')+' '+doc.number+' in this browser.');}
  }
  function updateCount(){setText('side-count',savedDocs.length);}
  function renderDashboard() {
    updateCount();setText('stat-docs',savedDocs.length);
    setText('stat-invoiced',zar(savedDocs.filter(d=>d.type==='invoice').reduce((n,d)=>n+totals(d).total,0)));
    setText('stat-quoted',zar(savedDocs.filter(d=>d.type==='quote').reduce((n,d)=>n+totals(d).total,0)));
    const latest=[...savedDocs].sort((a,b)=>String(b.savedAt||'').localeCompare(String(a.savedAt||''))).slice(0,4);
    el('recent-documents').innerHTML=latest.length?latest.map(d=>`<button type="button" class="recent-item" data-open="${safe(d.id)}"><span class="recent-icon"><svg class="ico"><use href="#${d.type==='invoice'?'i-invoice':'i-quote'}"/></svg></span><span class="recent-text"><b>${safe(d.number)}</b><small>${safe(d.clientName||'Unnamed client')} · ${d.type==='invoice'?'Invoice':'Quotation'}</small></span><span class="recent-amount">${zar(totals(d).total)}</span></button>`).join(''):'<div class="empty-mini"><div><svg class="ico"><use href="#i-documents"/></svg><p>No saved documents yet.<br>Create an invoice or quotation to begin.</p></div></div>';
  }
  function renderDocuments() {
    updateCount();const filter=el('document-filter').value;const query=cleanText(el('document-search').value).toLowerCase();
    const docs=[...savedDocs].sort((a,b)=>String(b.savedAt||'').localeCompare(String(a.savedAt||''))).filter(d=>(filter==='all'||d.type===filter)&&`${d.number} ${d.clientName} ${d.clientEmail}`.toLowerCase().includes(query));
    el('document-list').innerHTML=docs.length?docs.map(d=>`<div class="doc-row"><span class="doc-row-icon"><svg class="ico"><use href="#${d.type==='invoice'?'i-invoice':'i-quote'}"/></svg></span><div class="doc-row-main"><strong>${safe(d.number)} · ${safe(d.clientName||'Unnamed client')}</strong><span>${d.type==='invoice'?'Invoice':'Quotation'} · Issued ${niceDate(d.issueDate)} · ${safe(d.clientEmail||'No email')}</span></div><div class="doc-row-info"><b>${zar(totals(d).total)}</b><span class="status-chip">${safe(d.status||'draft')}</span></div><div class="doc-row-actions"><button class="row-action" title="Edit document" aria-label="Edit ${safe(d.number)}" data-open="${safe(d.id)}"><svg class="ico"><use href="#i-arrow"/></svg></button><button class="row-action" title="Duplicate document" aria-label="Duplicate ${safe(d.number)}" data-duplicate="${safe(d.id)}"><svg class="ico"><use href="#i-copy"/></svg></button><button class="row-action delete" title="Delete document" aria-label="Delete ${safe(d.number)}" data-delete="${safe(d.id)}"><svg class="ico"><use href="#i-trash"/></svg></button></div></div>`).join(''):'<div class="list-empty"><svg class="ico"><use href="#i-documents"/></svg><p>No documents match your search.<br>Create and save a new document to populate this workspace.</p></div>';
  }
  function openSaved(id) {const doc=savedDocs.find(d=>d.id===id);if(!doc)return;drafts[doc.type]=JSON.parse(JSON.stringify(doc));nav(doc.type);}
  function duplicateSaved(id) {const doc=savedDocs.find(d=>d.id===id);if(!doc)return;const fresh=JSON.parse(JSON.stringify(doc));fresh.id=null;fresh.number=nextNumber(doc.type);fresh.status='draft';fresh.issueDate=today();fresh.dueDate=shiftDate(fresh.issueDate,doc.type==='invoice'?14:30);drafts[doc.type]=fresh;nav(doc.type);toast('Document duplicated as a new unsaved draft.');}
  function deleteSaved(id) {const doc=savedDocs.find(d=>d.id===id);if(!doc)return;if(!window.confirm(`Delete ${doc.number} from this browser? This cannot be undone.`))return;const next=savedDocs.filter(d=>d.id!==id);if(writeJSON(KEY_DOCS,next)){savedDocs=next;updateCount();renderDocuments();toast('Document deleted from this browser.');}}
  function renderSettings() {const form=el('settings-form');for(const [name,value] of Object.entries(business))if(form.elements.namedItem(name))form.elements.namedItem(name).value=value;}
  function saveSettings(e) {e.preventDefault();const f=el('settings-form');const next={...business};for(const key of Object.keys(DEFAULT_BUSINESS)){const node=f.elements.namedItem(key);if(node)next[key]=cleanText(node.value);}
    if(!next.businessName){toast('Business name is required.');return;}
    if(writeJSON(KEY_BUSINESS,next)){business=next;toast('Business settings saved. New and open previews use these details.');}}
  function sendEmail() {
    const doc=current();if(!cleanText(doc.clientEmail)){toast('Add your client’s email address first.');$('#document-form [name="clientEmail"]').focus();return;}
    const isInvoice=doc.type==='invoice';const subject=`${isInvoice?'Invoice':'Quotation'} ${doc.number} | ${business.businessName}`;
    const body=`Hello ${doc.clientContact||doc.clientName||'there'},\n\nPlease find the ${isInvoice?'invoice':'quotation'} ${doc.number} from ${business.businessName} for ${doc.reference||'the agreed services'}.\n\nTotal: ${zar(totals(doc).total)}\n${isInvoice?'Payment due':'Valid until'}: ${niceDate(doc.dueDate)}\n\nPlease attach the PDF before sending this message.\n\nKind regards,\n${business.businessName}\n${business.businessEmail}`;
    window.location.href=`mailto:${encodeURIComponent(doc.clientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast('Your email app will open. Attach your downloaded PDF manually before sending.');
  }
  async function downloadPDF() {
    const doc=current();const button=el('button-download');button.disabled=true;
    try {
      if(typeof window.makeBusinessPDF!=='function') throw Error('PDF export engine unavailable.');
      const blob=await window.makeBusinessPDF(doc,business,totals(doc));
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${doc.type==='invoice'?'Invoice':'Quotation'}_${(doc.number||'Draft').replace(/[^a-z0-9_-]+/gi,'-')}.pdf`;
      document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
      toast('PDF generated. Check your downloads.');
    } catch(err) {console.error(err);toast('PDF generation failed. Use Print and choose “Save as PDF” as a fallback.');}
    finally {button.disabled=false;}
  }
  function init() {
    el('current-year').textContent=new Date().getFullYear();
    el('today-display').textContent=new Date().toLocaleDateString('en-ZA',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    $$('.nav-item,[data-view]').forEach(b=>b.addEventListener('click',()=>nav(b.dataset.view)));
    el('mobile-toggle').addEventListener('click',()=>{el('sidebar').classList.toggle('open');el('sidebar-overlay').classList.toggle('show');});
    el('sidebar-overlay').addEventListener('click',()=>{el('sidebar').classList.remove('open');el('sidebar-overlay').classList.remove('show');});
    el('header-new').addEventListener('click',()=>newDoc('invoice'));
    el('quick-invoice').addEventListener('click',()=>newDoc('invoice'));
    el('quick-quote').addEventListener('click',()=>newDoc('quote'));
    el('documents-new').addEventListener('click',()=>newDoc('invoice'));
    el('button-new').addEventListener('click',()=>newDoc(activeType));
    el('button-save').addEventListener('click',persistDoc);
    el('button-download').addEventListener('click',downloadPDF);
    el('button-print').addEventListener('click',()=>window.print());
    el('button-email').addEventListener('click',sendEmail);
    el('document-form').addEventListener('submit',e=>e.preventDefault());
    el('document-form').addEventListener('input',e=>{const name=e.target.name;if(!name)return;const doc=current();doc[name]=['discountRate','taxRate'].includes(name)?Math.max(0,Math.min(100,Number(e.target.value)||0)):e.target.value;renderPreview();});
    el('document-form').addEventListener('change',e=>{const name=e.target.name;if(!name)return;current()[name]=e.target.value;renderPreview();});
    el('line-item-editors').addEventListener('input',e=>{const index=Number(e.target.dataset.item);const prop=e.target.dataset.prop;if(!prop||!Number.isInteger(index))return;const doc=current();if(!doc.items[index])return;doc.items[index][prop]=['qty','rate'].includes(prop)?Math.max(0,Number(e.target.value)||0):e.target.value;const item=doc.items[index];const amount=$('.line-amount b',e.target.closest('.line-editor'));if(amount)amount.textContent=zar((Number(item.qty)||0)*(Number(item.rate)||0));renderPreview();});
    el('line-item-editors').addEventListener('click',e=>{const button=e.target.closest('[data-remove-item]');if(!button)return;const doc=current();if(doc.items.length<2){toast('Keep at least one service line.');return;}doc.items.splice(Number(button.dataset.removeItem),1);renderItemEditors();renderPreview();});
    el('add-line').addEventListener('click',()=>{const doc=current();if(doc.items.length>=60){toast('Maximum of 60 service lines per document.');return;}doc.items.push({description:'',detail:'',qty:1,rate:0});renderItemEditors();renderPreview();const last=$$('.line-description input',el('line-item-editors')).at(-2);if(last)last.focus();});
    el('zoom-out').addEventListener('click',()=>{zoomFactor=Math.max(.65,zoomFactor-.15);scalePaper();});
    el('zoom-in').addEventListener('click',()=>{zoomFactor=Math.min(1.55,zoomFactor+.15);scalePaper();});
    el('document-search').addEventListener('input',renderDocuments);
    el('document-filter').addEventListener('change',renderDocuments);
    el('settings-form').addEventListener('submit',saveSettings);
    document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.open)openSaved(b.dataset.open);else if(b.dataset.duplicate)duplicateSaved(b.dataset.duplicate);else if(b.dataset.delete)deleteSaved(b.dataset.delete);});
    window.addEventListener('resize',scalePaper);
    updateCount();nav('dashboard');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
