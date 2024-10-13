export namespace DTNUtils {
    export function element(doc: Document, id: string) : HTMLElement {
        return doc.getElementById(id)!;
    }
    export function elementAs<T extends HTMLElement>(doc: Document, id: string) : T {
        return (<T> doc.getElementById(id)!);
    }
    export function querySelector() {

    }
}

