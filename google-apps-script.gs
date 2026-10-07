const SHEET_NAME='Bookings';
const API_KEY='GANTI_SECRET_WAFAS'; // Samakan dengan website.
function doPost(e){try{const d=JSON.parse(e.postData.contents||'{}');if(d.apiKey!==API_KEY)return out({ok:false,error:'Unauthorized'});const ss=SpreadsheetApp.getActiveSpreadsheet();let sh=ss.getSheetByName(SHEET_NAME)||ss.insertSheet(SHEET_NAME);if(sh.getLastRow()===0)sh.appendRow(['Timestamp','Nama','WhatsApp','Email','Keperluan','Tanggal','Waktu','Jumlah Orang','Lokasi','Request','Source']);sh.appendRow([new Date(),d.name||'',d.whatsapp||'',d.email||'',d.service||'',d.date||'',d.time||'',d.people||'',d.location||'',d.request||'',d.source||'Website']);return out({ok:true});}catch(err){return out({ok:false,error:String(err)});}}
function doGet(){return out({ok:true,status:'Wafas Photo booking endpoint aktif'});}
function out(x){return ContentService.createTextOutput(JSON.stringify(x)).setMimeType(ContentService.MimeType.JSON);}
