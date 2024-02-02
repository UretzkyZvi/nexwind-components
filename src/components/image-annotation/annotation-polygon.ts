import Utils from "./annotation-utill";
import { Annotation, Point } from "./types";

/**
 * Handles polygon annotations including their selection, updating, and positioning.
 */
class PolygonHandler {
    // Class properties with brief descriptions
    private annotations: Annotation[];
    private updateAnnotations: (annotations: Annotation[]) => void;
    private utils: Utils;
    /**
     * Constructor for the PolygonHandler class.
     * @param updateAnnotations - Callback to update annotations in the parent component.
     */
    constructor(updateAnnotations: (annotations: Annotation[]) => void) {
      this.annotations = [];
      this.updateAnnotations = (newAnnotations) => {
        this.annotations = newAnnotations;
        updateAnnotations(newAnnotations); // Update annotations in the parent component
      };
      this.utils = new Utils();
    }
  
    clearAnnotations(): void {
      this.annotations = [];
      this.updateAnnotations([]);
    }
  
    selectedAnnotation(): Annotation | undefined {
      return this.annotations.find((ann) => ann.isSelected);
    }
  
    selectPolygon(index: number): void {
      // Select the polygon and update its isSelected status
      this.annotations = this.annotations.map((ann, idx) => ({
        ...ann,
        isSelected: idx === index,
      }));
      this.updateAnnotations(this.annotations);
    }
  
    removeAnnotation(): void {
      const selectedAnnotation = this.annotations.find((ann) => ann.isSelected);
      this.annotations = this.annotations.filter(
        (ann) => ann.id !== selectedAnnotation?.id
      );
      this.updateAnnotations(this.annotations);
    }
  
    updateAnnotation(annotationId: string, updatedAnnotation: Annotation): void {
      const updatedAnnotations = this.annotations.map((ann) =>
        ann.id === annotationId ? updatedAnnotation : ann
      );
      this.updateAnnotations(updatedAnnotations);
    }
  
    updatePolygon(index: number, updatedPoints: Point[]): void {
      if (this.annotations[index]) {
        this.annotations[index].points = updatedPoints;
        this.updateAnnotations(this.annotations);
      }
    }
  
    closePolygon(points: Point[]): void {
      const anchorPoint = this.utils.calculateAnchorPoint(points); // Calculate anchor point
      const classificationBoxPoint = this.utils.calculateButtonPosition(points); // Calculate position for the confirm button
  
      this.annotations.push({
        id: this.utils.generateUniqueId(),
        points: [...points.slice(0, -2)],
        type: "polygon",
        closed: true,
        anchorPoint,
        classificationBoxPoint,
      });
      this.updateAnnotations(this.annotations);
    }
  
    setAnnotations(annotations: Annotation[]): void {
      this.annotations = annotations;
      this.updateAnnotations(this.annotations);
    }
  
    getAnnotations(): Annotation[] {
      return this.annotations;
    }
  
    addPointAtIndex(index: number, point: Point): void {
      const selectedAnnotation = this.annotations.find((ann) => ann.isSelected);
      if (selectedAnnotation) {
        const newPoints = [
          ...selectedAnnotation.points.slice(0, index),
          point,
          ...selectedAnnotation.points.slice(index),
        ];
        selectedAnnotation.points = newPoints;
        this.updateAnnotations(this.annotations);
      }
    }
  
    updateAnnotationPoints(index: number, updatedPoints: Point[]): void {
      if (this.annotations[index]) {
        this.annotations[index].points = updatedPoints;
        this.updateAnnotations([...this.annotations]);
      }
    }
  
    findClosestEdge(point: Point): { index: number; distance: number } {
      const selectedAnnotation = this.annotations.find((ann) => ann.isSelected);
      if (!selectedAnnotation) return { index: -1, distance: Infinity };
  
      let closestDistance = Infinity;
      let closestIndex = -1;
  
      for (let i = 0; i < selectedAnnotation.points.length - 1; i++) {
        const distance = this.utils.pointToLineDistance(
          point,
          selectedAnnotation.points[i],
          selectedAnnotation.points[i + 1]
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i + 1; // Insert new point after the start point of the edge
        }
      }
  
      return { index: closestIndex, distance: closestDistance };
    }
  }

  export default PolygonHandler;