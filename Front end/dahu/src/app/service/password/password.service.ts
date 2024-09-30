import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  hashPassword(password:string):string{
    // Utilise CryptoJS pour hacher le mot de passe avec SHA-256
    return CryptoJS.SHA256(password).toString();
  }

}
