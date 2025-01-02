import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Member } from '../associations.member';
//import { Member } from './association.member';

@Entity()
export class AssociationDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  members?: Member[];

  constructor(name: string, members?: Member[]) {
    this.name = name;
    this.members = members;
  }
}