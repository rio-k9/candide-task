import { action, makeAutoObservable, computed } from 'mobx';
import { ActiveUser, CreateUser, IUserStore } from '../types/user';
import validateInput from '../utils/form-validation';
import { configure } from "mobx"
import stores from '.';

configure({
  enforceActions: "never",
})
class UserStore implements IUserStore {
  constructor() {
    makeAutoObservable(this)
  }
  name: string = 'testymctestface';
  create: CreateUser = {
    username: {
      error: false,
      input: "",
    },
    telephone: {
      error: false,
      input: "",
    },
    password: {
      error: false,
      input: "",
    },
  }
  terms: boolean = false
  user: ActiveUser = {
    name: "",
    access: false
  }

  @computed get canSubmit() {
    let flag = this.terms
    Object.keys(this.create).forEach(key => {
      const { error, input } = this.create[key]
      if (error || !input.length) {
        flag = false
      }
    })
    return flag
  }

  @action async onCreateInput({ target }: { target: HTMLInputElement }) {
    const { id, value }: { id: string, value: string } = target
    const passStatus = await validateInput(id, value)
    this.create[id].input = value
    if (typeof passStatus === "string") {
      this.create[id].error = passStatus
    }
    else if (typeof passStatus === 'boolean' && passStatus) {
      this.create[id].error = false
    }
  }

  @action toggleTerms() {
    this.terms = !this.terms
  }

  @action onSubmit() {
    this.user.name = this.create.username.input
    this.user.access = true
    stores.routing.history.push('/success')
  }
}

export default UserStore