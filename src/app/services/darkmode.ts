import { Injectable } from '@angular/core';

@Injectable()
export class Darkmode {

    dark = true;

	constructor() {}

    darkmode(){
        if(this.dark == true)
        {
            this.dark = false;
        }
        else {
            this.dark = true;
        }
    }
}
