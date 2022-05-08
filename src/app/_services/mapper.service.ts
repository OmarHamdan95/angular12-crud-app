import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {  mapperConfig, User } from '../Models/Employee';
import { EntityBase } from '../Models/EntityBase';

@Injectable({
    providedIn: 'root'
})
export class MapperService {

    constructor() {
        console.log("Mapper Service Call")
    }

    adapt<T extends EntityBase>(source: any, destiniationClass: new() => T, config: Array<mapperConfig> = null): any {
        if (!source) return null;

        let destiniation = new destiniationClass();

        //let y = destiniation.filedName;

        Object.keys(source).forEach(function (key, index) {
            if (source[key]) {
                let propertiesName = key;
                destiniation[propertiesName] = source[key];
            }
        });

        if (config != null) {
            config.forEach(x=> {
               destiniation[x.destiniationFiledName] = source[x.sourceFiledName] 
            })
        }


        return destiniation;
    }
}




