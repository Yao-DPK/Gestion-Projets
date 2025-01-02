import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  role: string;

  

  constructor(name: string, email: string, age: number, role: string) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.role = role;
  }
}