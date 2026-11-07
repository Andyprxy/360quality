/**
 * Print-ready, searchable vector PDF export, with the 360 Quality Solutions logo.
 * No external CDN, libraries, servers, trackers, or uploads are required.
 * PDF uses built-in Helvetica fonts for broad reader compatibility.
 */
(() => {
  'use strict';
  const LOGO_BASE64 = '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';
  const W=595.28, H=841.89;
  const NAVY=[.082,.20,.33], DARK=[.11,.23,.36], BLUE=[.17,.42,.64];
  const MUTED=[.43,.53,.62], LIGHT=[.93,.96,.98], BORDER=[.85,.90,.94], WHITE=[1,1,1];
  const rawMoney = n => 'R '+(Number(n)||0).toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});
  const textValue = s => String(s??'').replace(/[\u2010-\u2015]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/\u2026/g,'...').replace(/\u00a0/g,' ').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E\n\r]/g,'?');
  const pdfEscape=s=>textValue(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/[\r\n]/g,' ');
  const ascii=s=>Uint8Array.from([...s].map(c=>c.charCodeAt(0)&255));
  const rgb=c=>c.map(x=>Number(x).toFixed(3)).join(' ');
  function measured(s,size,bold=false){
    if(typeof document!=='undefined') {
      const cvs=measured.canvas||(measured.canvas=document.createElement('canvas'));
      const ctx=cvs.getContext('2d'); ctx.font=`${bold?'bold ':''}${size}px Arial`;
      return ctx.measureText(textValue(s)).width;
    }
    return String(s).length*size*(bold?.57:.52);
  }
  function wrap(s,width,size=9,bold=false){
    const output=[];
    for(const paragraph of textValue(s).split(/\n/)) {
      if(!paragraph.trim()){output.push('');continue;}
      let line='';
      for(let word of paragraph.split(/\s+/)) {
        while(measured(word,size,bold)>width && word.length>1) {
          let n=1;while(n<word.length&&measured(word.slice(0,n+1),size,bold)<=width)n++;
          if(line){output.push(line);line='';}
          output.push(word.slice(0,n));word=word.slice(n);
        }
        if(!word)continue;
        const candidate=line?line+' '+word:word;
        if(line&&measured(candidate,size,bold)>width){output.push(line);line=word;}else line=candidate;
      }
      if(line)output.push(line);
    }
    return output;
  }
  class Page {
    constructor(){this.ops=[];}
    rect(x,top,w,h,fill,stroke=null){this.ops.push(`q ${rgb(fill)} rg ${x.toFixed(2)} ${(H-top-h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f Q`);if(stroke)this.outline(x,top,w,h,stroke);}
    outline(x,top,w,h,color){this.ops.push(`q ${rgb(color)} RG 0.7 w ${x.toFixed(2)} ${(H-top-h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re S Q`);}
    line(x1,top1,x2,top2,color=BORDER,weight=1){this.ops.push(`q ${rgb(color)} RG ${weight} w ${x1.toFixed(2)} ${(H-top1).toFixed(2)} m ${x2.toFixed(2)} ${(H-top2).toFixed(2)} l S Q`);}
    text(s,x,baseline,size=10,color=DARK,bold=false,align='left'){
      const str=textValue(s).replace(/\n/g,' ');if(!str)return;
      let xx=x;if(align==='right')xx-=measured(str,size,bold);if(align==='center')xx-=measured(str,size,bold)/2;
      this.ops.push(`q ${rgb(color)} rg BT /${bold?'F2':'F1'} ${size.toFixed(2)} Tf 1 0 0 1 ${xx.toFixed(2)} ${(H-baseline).toFixed(2)} Tm (${pdfEscape(str)}) Tj ET Q`);
    }
    block(lines,x,baseline,width=240,size=9,leading=13,color=MUTED,bold=false,max=Infinity){
      let y=baseline; for(const line of lines.slice(0,max)){this.text(line,x,y,size,color,bold);y+=leading;}return y;
    }
    image(x,top,w,h){this.ops.push(`q ${w} 0 0 ${h} ${x} ${(H-top-h).toFixed(2)} cm /Im1 Do Q`);}
    toString(){return this.ops.join('\n');}
  }
  function head(page,d,b,pg,cont){
    page.rect(0,0,W,7,NAVY);page.rect(0,7,W,2,BLUE);
    page.image(38,31,58,51);
    const name=textValue(b.businessName||'360 Quality Solutions').toUpperCase();
    page.text(name,101,52,name.length>28?14.3:17,NAVY,true);
    page.text('QUALITY  /  COMPLIANCE  /  IMPROVEMENT',102,70,7.4,BLUE,true);
    page.text(d.type==='invoice'?'INVOICE':'QUOTATION',551,53,25,NAVY,true,'right');
    page.text(d.number||'-',550,71,10,MUTED,false,'right');
    page.rect(484,80,66,16,LIGHT);
    page.text(String(d.status||'DRAFT').toUpperCase(),517,91,7.6,BLUE,true,'center');
    page.line(43,122,552,122,BORDER,.9);page.rect(43,121,66,2,BLUE);
    if(!cont){
      page.text('PREPARED FOR',43,147,7.7,BLUE,true);
      page.text(d.clientName||'Client / company name',43,166,13,NAVY,true);
      let cy=181;
      if(d.clientContact)page.text(d.clientContact,43,cy+=12,8.7,MUTED);
      if(d.clientEmail)page.text(d.clientEmail,43,cy+=12,8.7,MUTED);
      page.block(wrap(d.clientAddress||'Client address',240,8.7),43,cy+=14,240,8.7,12,MUTED,false,4);
      page.text('DOCUMENT DETAILS',325,147,7.7,BLUE,true);
      const niceDate = s => s?new Date(s+'T12:00:00').toLocaleDateString('en-ZA',{day:'2-digit',month:'short',year:'numeric'}):'Not specified';
      const meta=[['Issue date',niceDate(d.issueDate)],[d.type==='invoice'?'Due date':'Valid until',niceDate(d.dueDate)],['Reference',d.reference||'-']];
      meta.forEach(([k,v],i)=>{const y=167+i*24;page.text(k,325,y,8.5,MUTED);const vs=wrap(v,145,8.7,true);page.text(vs[0]||'-',550,y,8.7,DARK,true,'right');});
    }else{
      page.text('DOCUMENT CONTINUED',43,155,9,BLUE,true);page.text(`Page ${pg}`,550,155,9,MUTED,false,'right');
    }
  }
  function tableHeader(page,y){
    page.text('SERVICES & FEES',43,y-13,8.5,NAVY,true);page.text('ALL AMOUNTS IN ZAR',550,y-13,7.5,MUTED,true,'right');
    page.rect(43,y,509,30,NAVY);
    page.text('DESCRIPTION',55,y+19,8,WHITE,true);page.text('QTY',377,y+19,8,WHITE,true,'right');page.text('RATE',454,y+19,8,WHITE,true,'right');page.text('AMOUNT',540,y+19,8,WHITE,true,'right');
  }
  function footer(page,d,b,pageIndex,totalPages){
    page.line(43,788,552,788,BORDER,.8);
    const address=String(b.businessAddress||'').replace(/\n/g,'  |  ');
    page.text(address,43,804,7.4,MUTED);
    page.text(`${b.businessEmail||''}  |  ${b.businessPhone||''}`,43,818,7.4,MUTED);
    page.text(`360QS / ${d.type==='invoice'?'INVOICE':'QUOTATION'}  /  ${pageIndex} OF ${totalPages}`,551,818,7.1,BLUE,true,'right');
  }
  function noteSummary(page,d,hasExtra){
    page.text('NOTES TO CLIENT',43,598,8,BLUE,true);
    if(hasExtra){page.text('Additional notes and full terms are provided',43,616,8.4,MUTED);page.text('on the final page of this document.',43,629,8.4,MUTED);return;}
    const notes=wrap(d.notes||'Thank you for considering 360 Quality Solutions.',245,8.5);
    page.block(notes,43,615,245,8.5,12,MUTED,false,4);
    const termsY=Math.max(675,615+Math.min(notes.length,4)*12+14);
    page.text(d.type==='invoice'?'PAYMENT TERMS':'QUOTATION TERMS',43,termsY,8,BLUE,true);
    page.block(wrap(d.terms||'',245,8.5),43,termsY+16,245,8.5,12,MUTED,false,4);
  }
  function details(page,d,b,summary,hasExtra){
    noteSummary(page,d,hasExtra);
    page.rect(332,589,220,139,LIGHT);page.outline(332,589,220,139,BORDER);
    const rows=[['Subtotal',rawMoney(summary.subtotal)]];
    if(Number(d.discountRate)>0)rows.push([`Discount (${d.discountRate}%)`,'-'+rawMoney(summary.discount)]);
    if(Number(d.taxRate)>0)rows.push([`VAT (${d.taxRate}%)`,rawMoney(summary.tax)]);
    rows.forEach(([name,value],i)=>{const yy=610+i*21;page.text(name,345,yy,9,MUTED);page.text(value,537,yy,9,DARK,true,'right');});
    page.line(345,685,539,685,BORDER,.8);
    page.text(d.type==='invoice'?'TOTAL DUE':'TOTAL QUOTED',345,707,8,BLUE,true);
    page.text(rawMoney(summary.total),537,707,18,NAVY,true,'right');
    if(d.type==='invoice'){
      const bankParts=[];if(b.bankName)bankParts.push(`Bank: ${b.bankName}`);if(b.accountName)bankParts.push(`Account: ${b.accountName}`);
      if(b.accountNumber)bankParts.push(`Number: ${b.accountNumber}`);if(b.branchCode)bankParts.push(`Branch: ${b.branchCode}`);
      const bank=bankParts.length?bankParts.join('  |  '):'Banking details supplied on request.';
      page.text('PAYMENT INFORMATION',43,747,7.5,BLUE,true);
      page.text(wrap(bank,495,8)[0],43,763,8,MUTED);
    }else{
      page.text('ACCEPTED BY CLIENT',43,747,7.5,BLUE,true);
      page.line(155,756,340,756,BORDER,.8);page.text('Signature / date',347,758,8,MUTED);
    }
  }
  function appendOverflowPages(pages,d,b) {
    const sections=[
      ['ADDITIONAL NOTES',d.notes||'Thank you for considering 360 Quality Solutions.'],
      [d.type==='invoice'?'PAYMENT TERMS':'QUOTATION TERMS',d.terms||'No additional terms supplied.']
    ];
    let page=null, y=0;
    const newPage=()=>{
      page=new Page();head(page,d,b,pages.length+1,true);
      page.text('FULL NOTES & TERMS',43,184,11,NAVY,true);page.line(43,198,552,198,BORDER);
      y=226;pages.push(page);
    };
    newPage();
    for(const [title,value] of sections){
      if(y>735)newPage();
      page.text(title,43,y,9,BLUE,true);y+=20;
      const lines=wrap(value,485,9.3);
      for(const line of lines){
        if(y>755){newPage();page.text(title+' (CONTINUED)',43,y,9,BLUE,true);y+=20;}
        if(line)page.text(line,43,y,9.3,MUTED);
        y+=14;
      }
      y+=27;
    }
  }
  function buildPages(d,b,sum){
    const rows=(Array.isArray(d.items)&&d.items.length?d.items:[{description:'',qty:1,rate:0}]).map(i=>{
      const desc=wrap(i.description||'Service description',279,9.7,true);const extra=i.detail?wrap(i.detail,279,8.3):[];
      return {i,desc,extra,height:Math.max(39,18+desc.length*13+extra.length*11)};
    });
    const chunks=[];let chunk=[],y=0;
    for(const row of rows){const maxH=chunks.length===0?225:335;if(chunk.length&&y+row.height>maxH){chunks.push(chunk);chunk=[];y=0;}chunk.push(row);y+=row.height;}
    if(chunk.length)chunks.push(chunk);
    const noteLines=wrap(d.notes||'',240,8.5).length;const termLines=wrap(d.terms||'',240,8.5).length;
    const hasExtra=noteLines>4||termLines>4;
    const pages=[];
    for(let k=0;k<chunks.length;k++){
      const page=new Page();const first=k===0;
      head(page,d,b,k+1,!first);
      const headerY=first?279:196;tableHeader(page,headerY);
      let cursor=headerY+30;
      chunks[k].forEach((row,ix)=>{
        if(ix%2===1)page.rect(43,cursor,509,row.height,[.977,.985,.993]);
        page.block(row.desc,55,cursor+19,280,9.7,13,DARK,true);
        if(row.extra.length)page.block(row.extra,55,cursor+19+row.desc.length*13,280,8.3,11,MUTED,false);
        page.text(Number(row.i.qty)||0,377,cursor+19,9.2,DARK,false,'right');
        page.text(rawMoney(row.i.rate),454,cursor+19,9.2,DARK,false,'right');
        page.text(rawMoney((Number(row.i.qty)||0)*(Number(row.i.rate)||0)),540,cursor+19,9.2,DARK,true,'right');
        cursor+=row.height;page.line(43,cursor,552,cursor,BORDER,.55);
      });
      if(k===chunks.length-1){details(page,d,b,sum,hasExtra);}else{page.text('Continued on the following page',551,746,8.5,MUTED,false,'right');}
      pages.push(page);
    }
    if(hasExtra)appendOverflowPages(pages,d,b);
    pages.forEach((p,i)=>footer(p,d,b,i+1,pages.length));
    return pages;
  }
  function join(parts){let length=parts.reduce((n,p)=>n+p.length,0),offset=0,out=new Uint8Array(length);for(const p of parts){out.set(p,offset);offset+=p.length;}return out;}
  function makeBinaryPdf(pages){
    const objects=[null];const add=o=>(objects.push(o),objects.length-1);
    const catalogId=add(null),pagesId=add(null);
    const font1=add(ascii('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
    const font2=add(ascii('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'));
    const jpeg=Uint8Array.from(atob(LOGO_BASE64),x=>x.charCodeAt(0));
    const imgId=add(join([ascii(`<< /Type /XObject /Subtype /Image /Width 240 /Height 211 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`),jpeg,ascii('\nendstream')]));
    const pageIds=[];
    for(const page of pages){
      const stream=ascii(page.toString()+'\n');
      const streamId=add(join([ascii(`<< /Length ${stream.length} >>\nstream\n`),stream,ascii('endstream')]));
      const pageId=add(ascii(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W.toFixed(2)} ${H.toFixed(2)}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> /XObject << /Im1 ${imgId} 0 R >> >> /Contents ${streamId} 0 R >>`));
      pageIds.push(pageId);
    }
    objects[catalogId]=ascii(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
    objects[pagesId]=ascii(`<< /Type /Pages /Kids [${pageIds.map(n=>n+' 0 R').join(' ')}] /Count ${pageIds.length} >>`);
    const parts=[ascii('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n')];const offsets=[0];let offset=parts[0].length;
    for(let i=1;i<objects.length;i++){const head=ascii(`${i} 0 obj\n`),foot=ascii('\nendobj\n');offsets.push(offset);parts.push(head,objects[i],foot);offset+=head.length+objects[i].length+foot.length;}
    const xrefOffset=offset;
    let xref=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for(let i=1;i<offsets.length;i++)xref+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
    xref+=`trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    parts.push(ascii(xref));return join(parts);
  }
  window.makeBusinessPDF=async(d,b,s)=>new Blob([makeBinaryPdf(buildPages(d,b,s))],{type:'application/pdf'});
})();
