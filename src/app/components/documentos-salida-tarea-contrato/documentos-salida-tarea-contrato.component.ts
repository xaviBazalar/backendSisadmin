import { Component, OnInit, ViewChild } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { DocumentosEntradaService } from '../../services/documentos-entrada.service';
import { ContratosService } from '../../services/contratos.service';
import { TareaDocumentosSalidaService } from '../../services/tarea-documentos-salida.service';
import { DocumentosSalidaService } from '../../services/documentos-salida.service';
import { PaginadorComponent } from '../paginador/paginador.component';

@Component({
  selector: 'app-documentos-salida-tarea-contrato',
  templateUrl: './documentos-salida-tarea-contrato.component.html',
  styleUrls: ['./documentos-salida-tarea-contrato.component.css']
})
export class DocumentosSalidaTareaContratoComponent implements OnInit {
  listaDocumentosSalida:any=[];
  listaTareaDocumentosSalida:any=[];
  listaTareas:any=[];
  listaContrato:any=[];

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalDocumentoSalidaTC:boolean=false
  showModalDocumentoSalida:boolean=false

  showUpdateDocumentoSTC:boolean=false
  showUpdateDocumentoS:boolean=false

  pagTareDocumentosSalida:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagDocumentosSalida:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  @ViewChild("pagTDS",{static:false}) paginator:any;
  @ViewChild("pagDS",{static:false}) paginatorDS:any;

  constructor(public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public documentosSalidaService:DocumentosSalidaService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService) { }

  async ngOnInit(): Promise<void> {
    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
    })

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos.docs
    })

    this.documentosSalidaService.getDocumentosSalida(1,1).subscribe((data:any)=>{
      this.pagDocumentosSalida.hasNextPage=data.documentos_salida.hasNextPage
      this.pagDocumentosSalida.hasPrevPage=data.documentos_salida.hasPrevPage
      this.pagDocumentosSalida.totalPages=new Array(data.documentos_salida.totalPages)
      this.pagDocumentosSalida.page=data.documentos_salida.page
      this.listaDocumentosSalida= data.documentos_salida.docs
      this.paginatorDS.pagParams=this.pagDocumentosSalida
    })

    let dataTDS:any =await this.tareaDocumentosSalidaService.getTareaDocumentosSalida("","",1,1).toPromise()
    this.pagTareDocumentosSalida.hasNextPage=dataTDS.tarea_documentos_salida.hasNextPage
    this.pagTareDocumentosSalida.hasPrevPage=dataTDS.tarea_documentos_salida.hasPrevPage
    this.pagTareDocumentosSalida.totalPages=new Array(dataTDS.tarea_documentos_salida.totalPages)
    this.pagTareDocumentosSalida.page=dataTDS.tarea_documentos_salida.page
    this.listaTareaDocumentosSalida=dataTDS.tarea_documentos_salida.docs
    this.paginator.pagParams=this.pagTareDocumentosSalida

    /*this.tareaDocumentosSalidaService.getTareaDocumentosSalida("","",1,1).subscribe((data:any)=>{
      this.pagTareDocumentosSalida.hasNextPage=data.tarea_documentos_salida.hasNextPage
      this.pagTareDocumentosSalida.hasPrevPage=data.tarea_documentos_salida.hasPrevPage
      this.pagTareDocumentosSalida.totalPages=new Array(data.tarea_documentos_salida.totalPages)
      this.pagTareDocumentosSalida.page=data.tarea_documentos_salida.page
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida.docs
      this.paginator=this.pagTareDocumentosSalida
    })*/
  }

  filterDSTareasContratos(){
    let contrato:any=document.querySelector("#searchContrato")
    let tarea:any=document.querySelector("#searchTarea")
    let dataFilter="n_contrato="+contrato.value+"&n_tarea="+tarea.value
    this.tareaDocumentosSalidaService.getTareaDocumentosSalidaFilter("","",dataFilter).subscribe((data:any)=>{
      this.pagTareDocumentosSalida.hasNextPage=data.tarea_documentos_salida.hasNextPage
      this.pagTareDocumentosSalida.hasPrevPage=data.tarea_documentos_salida.hasPrevPage
      this.pagTareDocumentosSalida.totalPages=new Array(data.tarea_documentos_salida.totalPages)
      this.pagTareDocumentosSalida.page=data.tarea_documentos_salida.page
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida.docs
      this.paginator.pagParams=this.pagTareDocumentosSalida
    })
  }

  filterDE(){
    let documento_salida:any=document.querySelector("#searchDocumentoSalida")
    let dataFilter="n_documento_salida="+documento_salida.value
    this.documentosSalidaService.getDocumentosSalidaFilter(1,1,dataFilter).subscribe((data:any)=>{
      this.pagDocumentosSalida.hasNextPage=data.documentos_salida.hasNextPage
      this.pagDocumentosSalida.hasPrevPage=data.documentos_salida.hasPrevPage
      this.pagDocumentosSalida.totalPages=new Array(data.documentos_salida.totalPages)
      this.pagDocumentosSalida.page=data.documentos_salida.page
      this.listaDocumentosSalida= data.documentos_salida.docs
      this.paginatorDS.pagParams=this.pagDocumentosSalida
    })
  }

  refreshLista(info:any,tipo:string){
    if(tipo=="TareaDSalida"){
      this.refreshTareaDocumentosSalida(info)
    }else if(tipo=="DSalida"){
      this.refreshDocumentosSalida(info);
    }
  }

  refreshDocumentosSalida(page:string|number){
    this.documentosSalidaService.getDocumentosSalida(page,1).subscribe((data:any)=>{
      this.pagDocumentosSalida.hasNextPage=data.documentos_salida.hasNextPage
      this.pagDocumentosSalida.hasPrevPage=data.documentos_salida.hasPrevPage
      this.pagDocumentosSalida.totalPages=new Array(data.documentos_salida.totalPages)
      this.pagDocumentosSalida.page=data.documentos_salida.page
      this.listaDocumentosSalida= data.documentos_salida.docs
      this.paginatorDS.pagParams=this.pagDocumentosSalida
    })
  }

  refreshTareaDocumentosSalida(page:string|number){
    this.tareaDocumentosSalidaService.getTareaDocumentosSalida("","",page,1).subscribe((data:any)=>{
      this.pagTareDocumentosSalida.hasNextPage=data.tarea_documentos_salida.hasNextPage
      this.pagTareDocumentosSalida.hasPrevPage=data.tarea_documentos_salida.hasPrevPage
      this.pagTareDocumentosSalida.totalPages=new Array(data.tarea_documentos_salida.totalPages)
      this.pagTareDocumentosSalida.page=data.tarea_documentos_salida.page
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida.docs
      this.paginator.pagParams=this.pagTareDocumentosSalida
    })
  }

  addDocumentoSalidaTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")

    let dataDocumentoTC:any={
      tarea:tarea.value,
      documento_salida:documento_salida.value,
      contrato:contrato.value
    }

    this.tareaDocumentosSalidaService.addTareaDocumentosSalida(dataDocumentoTC).subscribe((data:any)=>{
      this.refreshTareaDocumentosSalida(1)
      this.closeModalDocumentoSalidaCT()
    })

  }

  editDocumentoSalidaTC(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDocumentoSTC=true

    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDSTC")
    let id:any=document.querySelector("#id_documento_s_tc")
    tarea.value=data.tarea._id
    documento_salida.value=data.documento_salida._id
    contrato.value=data.contrato._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalDocumentoSalidaCT()
  }

  updateDocumentoSalidaTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDSTC")
    let id:any=document.querySelector("#id_documento_s_tc")

    let dataDocumentoSTC:any={
      tarea:tarea.value,
      documento_salida:documento_salida.value,
      contrato:contrato.value,
      estado:estado.value,
      id:id.value
    }

    this.tareaDocumentosSalidaService.updateTareaDocumentosSalida(dataDocumentoSTC).subscribe((data:any)=>{
      this.refreshTareaDocumentosSalida(1)
      this.closeModalDocumentoSalidaCT()
    })
  }

  addDocumentoSalida(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")

    let dataDocumentoSalida:any={
      tipo_documento:tipo_documento.value,
      requerido:true,
      descripcion:descripcion.value,
    }

    console.log(dataDocumentoSalida)

    this.documentosSalidaService.addDocumentoSalida(dataDocumentoSalida).subscribe((data:any)=>{
      this.refreshDocumentosSalida(1)
      this.closeModalDocumentoSalida()
    })

  }

  editDocumentoSalida(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDocumentoS=true
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_documento_s")
    descripcion.value=data.descripcion
    tipo_documento.value=data.tipo_documento
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalDocumentoSalida()
  }

  updateDocumentoSalida(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_documento_s")

    let dataDocumentoSalida:any={
      tipo_documento:tipo_documento.value,
      descripcion:descripcion.value,
      estado:estado.value,
      id:id.value
    }

    this.documentosSalidaService.updateDocumentoSalida(dataDocumentoSalida).subscribe((data:any)=>{
      this.refreshDocumentosSalida(1)
      this.closeModalDocumentoSalida()
    })
  }

  openModalDocumentoSalidaCT(){
    this.showModalDocumentoSalidaTC=true;
  }

  openModalDocumentoSalida(){
    this.showModalDocumentoSalida=true;
  }

  closeModalDocumentoSalidaCT(){
    this.showModalDocumentoSalidaTC=false;
    this.showUpdateDocumentoSTC=false
    this.resetFormDSTC()
  }

  closeModalDocumentoSalida(){
    this.showModalDocumentoSalida=false;
    this.showUpdateDocumentoS=false
    this.resetFormDS()
  }

  resetFormDSTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDETC")
    let id:any=document.querySelector("#id_documento_e_tc")
    tarea.value=""
    documento_salida.value=""
    contrato.value=""
    estado.value=""
    id.value=""
  }

  resetFormDS(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_documento_s")
    descripcion.value=""
    tipo_documento.value=""
    estado.value=""
    id.value=""
  }

}
