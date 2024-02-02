
interface Point {
  x: number;
  y: number;
}

interface Annotation {
  id: string;
  points: Point[];
  type: "polygon";
  closed: boolean;
  anchorPoint?: Point;
  classificationBoxPoint?: Point;
  isSelected?: boolean;
  label?: Label;
}
interface Label {
  name: string;
  value?: string;
  color: string;
}
interface ImageUrl {
  url: string;
  id: string;
}

interface ImageAnnotationComponentProps {
  imageUrls: ImageUrl[];
  mode: "segmentation" | "classification";
  labels?: Label[];
}

export type {
  Point,
  Annotation,
  Label,
  ImageUrl,
  ImageAnnotationComponentProps
};