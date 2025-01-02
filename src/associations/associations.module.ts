import { forwardRef, Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './entities/association.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService, Repository],
  imports: [TypeOrmModule.forFeature([Association]),/*forwardRef(() => RoleModule),*/forwardRef(() => UsersModule),/*forwardRef(() => MinuteModule)*/ TypeOrmModule.forFeature([Association])],
})
export class AssociationsModule {}
