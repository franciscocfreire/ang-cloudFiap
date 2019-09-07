import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const alunos = [
      {
        idAluno: 1,
        nomeAluno: 'Francisco',
        enderecoAluno: 'Rua 1',
        telefoneAluno: 123456,
        foto: '/FOTO/foto1.jpg'

      },

      {
        idAluno: 2,
        nomeAluno: 'Helio',
        enderecoAluno: 'Rua 2',
        telefoneAluno: 123456,
        foto: '/FOTO/foto2.jpg'

      },

      {
        idAluno: 3,
        nomeAluno: 'Julio',
        enderecoAluno: 'Rua 3',
        telefoneAluno: 123456,
        foto: '/FOTO/foto3.jpg'

      },

      {
        idAluno: 4,
        nomeAluno: 'Vinicius',
        enderecoAluno: 'Rua 4',
        telefoneAluno: 123456,
        foto: '/FOTO/foto4.jpg'

      }
    ];

    return { alunos };
  }

  genId(alunos: Aluno[]): number {
    return alunos.length > 0 ? Math.max(...alunos.map(aluno => aluno.idAluno)) + 1 : 11;
  }
}
