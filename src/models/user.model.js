import bcrypt from "bcrypt";
import {Db} from "../routes/Db.js";
import { ObjectId } from "mongodb";
const collectionName="User";
export default class User{
    constructor(name,email,password,role){
        this.name=name;
        this.email=email;
        this.password=password;
        this.role=role;
    }
    static async creatUser(name,email,password,role){
        const userCollection= await Db().collection(collectionName);
        const user=new User(name,email,password,role);
        await userCollection.insertOne(user);
    }
    static async getAllUser(){
       const userCollection= await Db().collection(collectionName);
       const users=await userCollection.find({}).toArray();
    //    console.log(users)
       return users;
    }
    
    static async getUserByemail(email){
       const userCollection= await Db().collection(collectionName);
       const user= userCollection.findOne({email:email});
       return user;
    }
    static async getUserById(id){
        const userCollection= await Db().collection(collectionName);
       const user=await userCollection.findOne({_id: new ObjectId(id)});
    //    console.log(user)
       return user;
    }

}
