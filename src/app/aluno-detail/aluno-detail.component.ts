import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from "../aluno";
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css']
})
export class AlunoDetailComponent implements OnInit {

  aluno: Aluno;
  
  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAluno();
  }

  getAluno() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.alunoService.getAluno(id).subscribe(aluno => this.aluno = aluno);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.alunoService.updateAluno(this.aluno).subscribe(()=> this.goBack());
  }

}
