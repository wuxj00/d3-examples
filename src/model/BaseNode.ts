export default class BaseNode {

    private id: string;
    private name: string;

    public constructor(id: string = '', name: string = '') {
        this.id = id;
        this.name = name;
    }
}
