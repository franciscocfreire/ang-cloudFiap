import { Component, OnInit } from '@angular/core';
import { Aluno } from '../aluno';
import { AlunoService } from "../aluno.service";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  profileForm = this.fb.group({
    idAluno: ['', Validators.required],
    nomeAluno: ['', Validators.required],
    enderecoAluno: [''],
    telefoneAluno: [''],
    foto: ['']
  });

  alunos: Aluno[];  

  constructor(
    private alunoService: AlunoService,
    private fb: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.getAlunos();
  }  

  getAlunos(): void {
    this.alunoService.getAlunos().subscribe(alunos => this.alunos = alunos);
  }

  delete(aluno: Aluno) {
    
    this.alunos = this.alunos.filter(h => h !== aluno)    
    this.alunoService.deleteAluno(aluno).subscribe()
  }

  fileData = null;

  private domainUrl = 'https://cloud-fiap.azurewebsites.net/' 
  private resourceUrl = 'fileServe';

  onSubmit() {
    
    let urlMultiPart = `${this.domainUrl}${this.resourceUrl}`;
    let serializedForm = JSON.stringify(this.profileForm.value);
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('aluno', serializedForm);



    // this.http.post(urlMultiPart, formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('SUCCESS !!');
    //   })


      this.http.post(urlMultiPart, formData, {
        reportProgress: true,
        observe: 'events'   
    })
    .subscribe(events => {
        if(events.type == HttpEventType.UploadProgress) {
            console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
        } else if(events.type === HttpEventType.Response) {
            console.log(events);
        }
    })
    
    
    // this.alunoService.addAluno( serializedForm)
    // .subscribe( aluno => {
    //   this.alunos.push(aluno)
    // })
    
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
 

  // add(name : string): void {
  //   name = name.trim();
  //   if(!name) { return;}
  //   this.alunoService.addAluno({name,} as Aluno)
  //   .subscribe( aluno => {
  //     this.alunos.push(aluno);
  //   })
  // }
}
