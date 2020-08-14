const fs = require('fs')
const path = require('path')
class Users {
    constructor(first_name, last_name, password, email) {
        this.first_name = first_name
        this.last_name = last_name
        this.password = password
        this.email = email
    }
    toJSON() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
            email: this.email,
            // id: this.id
        }
    }

    async save() {
        const users = await Users.getAll()
        users.push(this.toJSON())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'users.json'),
                JSON.stringify(users),
                (err) =>{
                    if (err) {
                        reject(err)
                    }else {
                        resolve()
                    }
                }
        )
        })

    }

    static getAll(){
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'users.json'),
                'utf-8',
                (err, data)=>{
                    if (err) {
                        reject (err)
                    }else
                        resolve(JSON.parse(data))
                }
            )
        })
    }
    static async getByEmail(email) {
        const users  = await Users.getAll()
        return new Promise((resolve, reject) => {
              users.find(u => u.email === email)
        })


    }
    // static asinc emailExists() {
    //
    //     users.find(el => {
    //     return  el.email === requestBody.email
    // });
    // if (emailExists) {
    //     res.end('User with such an email already exists. Register, please, with another one.')
    // } else {
    // users.push(req.body);
    // res.end('Hurray! You\'re successfully registered!')}


    async find(email) {
       const users  = await Users.getAll()
        return new Promise((resolve, reject) => {
            users.find(u => u.email === email,
                (err) =>{
                    if (err) {
                        reject(err)
                    }else {
                        resolve()
                    }
                })
        });
    }
}
module.exports = Users
