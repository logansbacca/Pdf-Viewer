import React,{useState} from 'react';
import {IonApp,IonTitle,IonToolbar,IonHeader,IonButton,IonSegment,IonItem} from '@ionic/react'

// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

export const App = () => {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
      alert("file submitted")
    }
    else{
      setViewPdf(null);
    }
  }

  return (
    <IonApp>
    <div className="App">
    <IonHeader className="header">
        <IonToolbar>
          <IonTitle>PDF Viewer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonItem className="main">
      <form onSubmit={handlePdfFileSubmit}>
        <input type="file"  required onChange={handlePdfFileChange}/>
        {pdfFileError&&<div>{pdfFileError}</div>}
        <button className="blue-button" type="submit">UPLOAD</button>
        
      </form>
      </IonItem>
      <br></br>
      <IonSegment>
      <IonTitle color="secondary">View PDF</IonTitle>
      </IonSegment>

      <section className="pdf-container">
         {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">

          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}
      {!viewPdf&& <p>Please select a file</p>}
      </section>

    </div>
    </IonApp>
  );
}

export default App;
