import { Annotation } from "./types";


class AnnotationStore {
    private store: { [key: string]: Annotation[] } = {};

    addAnnotation(storeKey: string, annotation: Annotation): void {
        if (!storeKey) {
            throw new Error("Annotation must have a 'storeKey' property");
        }
        if (!this.store[storeKey]) {
            this.store[storeKey] = [];
        }
        this.store[storeKey].push(annotation);
    }

    addAnnotations(storeKey: string, annotations: Annotation[]): void {
        annotations.forEach((annotation) => this.addAnnotation(storeKey, annotation));
    }

    getAnnotations(storeKey: string): Annotation[] {
        return this.store[storeKey];
    }

    updateAnnotation(storeKey: string, annotation: Annotation): void {
        if (!storeKey || !this.store[storeKey]) {
            throw new Error("Annotation does not exist");
        }
        const index = this.store[storeKey].findIndex((a) => a.id === annotation.id);
        if (index === -1) {
            throw new Error("Annotation does not exist");
        }
        this.store[storeKey][index] = annotation;

    }

    deleteAnnotation(storeKey: string): void {
        if (!this.store[storeKey]) {
            throw new Error("Annotation does not exist");
        }
        delete this.store[storeKey];
    }

    getAllAnnotations(): Annotation[] {
        return Object.values(this.store).flat();
    }

    clearAllAnnotations(): void {
        this.store = {};
    }

    saveAnnotations(): void {
        const annotations = this.getAllAnnotations();
        localStorage.setItem("annotations", JSON.stringify(annotations));
    }

    loadAnnotations(): void {
        const annotations = localStorage.getItem("annotations");
        if (annotations) {
            this.store = JSON.parse(annotations);
        }
    }
}

const annotationStore = new AnnotationStore();
export default annotationStore;
