import {Client, Account, Databases} from 'appwrite'

export const client = new Client()
    .setEndpoint('https://bm.atomichouse.co/v1')
    .setProject('644024c77289c7e6cbc4');

export const account = new Account(client);
export const id = new Account(client);
export const databases = new Databases( client);