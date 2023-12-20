import Model from './Model.js'
export default class dictionnaire extends Model {
    static table = "schema.dictionnaire"
    static primary = ["id"]
}