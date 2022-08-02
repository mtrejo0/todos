import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Todo } from "../types/types";
import { auth } from "../config/firebase";

export default class Todos {
  static db_name = "todos";
  static todosCollection = collection(
    db,
    this.db_name
  ) as CollectionReference<Todo>;

  static async add(task: string, tags: string[]) {
    try {
      await addDoc(collection(db, this.db_name), {
        task,
        tags,
        done: false,
        uid: auth.currentUser?.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  static async delete(id: string) {
    await deleteDoc(doc(db, this.db_name, id));
  }

  static async update(todo: Todo, updated: any) {
    const ref = doc(db, this.db_name, todo.id!);
    setDoc(ref, { ...todo, ...updated });
  }
}
