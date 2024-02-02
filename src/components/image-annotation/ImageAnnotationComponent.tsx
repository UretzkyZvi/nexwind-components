import React, { useState, useRef, FC, useEffect } from "react";
import {
  Stage,
  Layer,
  Line,
  Image as KonvaImage,
  Circle,
  Rect,
} from "react-konva";
import { useImage } from "react-konva-utils";
import { KonvaEventObject } from "konva/lib/Node";
import { Pentagon, Trash2 } from "lucide-react";
import Button from "../form/Button";
import {
  Annotation,
  ImageAnnotationComponentProps,
  ImageUrl,
  Label,
  Point,
} from "./types";
import annotationStore from "./AnnotationStore";
import Utils from "./annotation-utill";
import PolygonHandler from "./annotation-polygon";
 
/**
 * Functional component for image annotation using Konva.
 * Allows polygon annotations on an image with features like drawing, selecting, and updating polygons.
 * @param {ImageAnnotationComponentProps} props - Component props containing image URL and mode.
 * @returns React Functional Component
 */
const ImageAnnotationComponent: FC<ImageAnnotationComponentProps> = ({
  imageUrls,
  labels = [
    { name: "label 1", value: "label1", color: "red" },
    { name: "label 2", value: "label2", color: "blue" },
  ],
  mode = "segmentation",
}) => {
  // State variables with brief descriptions
  const [currentImage, setCurrentImage] = useState<ImageUrl>();

  const [isAnchorClicked, setIsAnchorClicked] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [currentLabel, setCurrentLabel] = useState<Label>(labels[0]);
  const [scale, setScale] = useState(1);
  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const [image] = useImage(currentImage?.url || "");

  const edgeClickThreshold = 5;

  const parentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Refs and other variables with explanations
  const polygonHandlerRef = useRef(new PolygonHandler(setAnnotations));
  const utilRef = useRef(new Utils());
  useEffect(() => {
    // Load annotations for the current image

    if (currentImage === undefined) {
      setCurrentImage(imageUrls[0]);
    } else if (currentImage) {
      const currentAnnotations =
        annotationStore.getAnnotations(currentImage.id) || [];
      setAnnotations(currentAnnotations);
    }
  }, [currentImage]);

  useEffect(() => {
    if (parentRef.current && image) {
      const availableHeight = parentRef.current.clientHeight;
      const availableWidth = parentRef.current.clientWidth;
      setParentHeight(availableHeight);
      setParentWidth(availableWidth);
      const newScale = Math.min(
        availableWidth / image.width,
        availableHeight / image.height
      );

      const newSize = {
        width: image.width * newScale,
        height: image.height * newScale,
      };

      setScale(newScale);
      setSize(newSize);

      // Calculate X and Y after setting the new size
      const newX = (availableWidth - newSize.width) / 2;
      const newY = (availableHeight - newSize.height) / 2;

      setImageX(newX);
      setImageY(newY);
    }
    return () => {
      // Cleanup
      setScale(1);
      setImageX(0);
      setImageY(0);
      setParentWidth(0);
      setParentHeight(0);
      setSize({ width: 0, height: 0 });
        
    };
  }, [image, parentRef.current]);

  const saveAnnotations = () => {
    if (currentImage) {
      annotationStore.addAnnotations(currentImage.id, annotations);
    }
  };

  const handleLabelChange = (e: any) => {
    const selectedValue = e.target.value;
    const selectedLabel = labels.find((label) => label.value === selectedValue);
    setCurrentLabel(selectedLabel || labels[0]);

    // Update the current annotation with the new label
    const updatedAnnotation = {
      ...polygonHandlerRef.current.selectedAnnotation(),
      label: selectedLabel,
    } as Annotation;
    polygonHandlerRef.current.updateAnnotation(
      updatedAnnotation.id,
      updatedAnnotation
    );
  };

  const goToNextImage = () => {
    saveAnnotations();
    setAnnotations([]);
    polygonHandlerRef.current.clearAnnotations();

    const indexOfCurrentImage = imageUrls.findIndex(
      (x) => x.id === currentImage?.id
    );
    if (indexOfCurrentImage < imageUrls.length - 1) {
      setCurrentImage(imageUrls[indexOfCurrentImage + 1]);
      polygonHandlerRef.current.setAnnotations(
        annotationStore.getAnnotations(imageUrls[indexOfCurrentImage + 1].id) ||
          []
      );
    }
  };

  const goToPreviousImage = () => {
    saveAnnotations();
    setAnnotations([]);

    polygonHandlerRef.current.clearAnnotations();
    const indexOfCurrentImage = imageUrls.findIndex(
      (x) => x.id === currentImage?.id
    );
    if (indexOfCurrentImage > 0) {
      setCurrentImage(imageUrls[indexOfCurrentImage - 1]);
      polygonHandlerRef.current.setAnnotations(
        annotationStore.getAnnotations(imageUrls[indexOfCurrentImage - 1].id) ||
          []
      );
    }
  };

  // Function definitions with comments explaining logic
  /**
   * Handles mouse down events on the Konva Stage.
   * Includes logic for polygon drawing, selection, and edge manipulation.
   * @param {KonvaEventObject<MouseEvent>} event - Mouse event from Konva.
   */
  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (selectedTool !== "polygon") return;

    const stage = event.target.getStage();
    if (!stage) return;

    const mousePos = stage.getPointerPosition();
    if (!mousePos) return;

    annotations.forEach((ann, annIdx) => {
      if (ann.isSelected) {
        for (let i = 0; i < ann.points.length - 1; i++) {
          const distance = utilRef.current.pointToLineDistance(
            mousePos,
            ann.points[i],
            ann.points[i + 1]
          );
          if (distance < edgeClickThreshold) {
            const isCloseToExistingPoint = ann.points.some((p) =>
              utilRef.current.arePointsClose(p, mousePos)
            );
            if (!isCloseToExistingPoint) {
              const updatedPoints = [...ann.points];
              updatedPoints.splice(i + 1, 0, mousePos); // Add new point
              polygonHandlerRef.current.updatePolygon(annIdx, updatedPoints);
              updatePoints(annIdx, i + 1, mousePos);
              break;
            }
          }
        }
      }
    });

    if (isAnchorClicked) {
      return;
    }

    // Continue drawing a new polygon or close it
    const newPoints = [...currentPoints, mousePos];
    setCurrentPoints(newPoints);

    if (
      newPoints.length > 2 &&
      utilRef.current.arePointsClose(mousePos, newPoints[0])
    ) {
      polygonHandlerRef.current.closePolygon([...newPoints, currentPoints[0]]);
      setCurrentPoints([]);
    }
  };

  const updatePoints = (index: number, pointIndex: number, newPoint: Point) => {
    const updatedAnnotations = annotations.map((ann, annIdx) => {
      if (annIdx === index) {
        const updatedPoints = ann.points.map((p, idx) =>
          idx === pointIndex ? newPoint : p
        );
        return { ...ann, points: updatedPoints };
      }
      return ann;
    });

    setAnnotations(updatedAnnotations);
    polygonHandlerRef.current.updateAnnotationPoints(
      index,
      updatedAnnotations[index].points
    );
  };

  const onSelectTool = (tool: string) => setSelectedTool(tool);

  const confirmChanges = () => {
    // Deselect the polygon and hide the confirm button
    setIsAnchorClicked(false);

    const currentAnnotation = polygonHandlerRef.current.selectedAnnotation();
    if (!currentAnnotation || !currentLabel) return;
    polygonHandlerRef.current.updateAnnotation(currentAnnotation.id, {
      ...currentAnnotation,
      label: currentLabel,
    });
    setCurrentLabel(labels[0]);
    polygonHandlerRef.current.selectPolygon(-1);
  };

  const renderEditablePoints = (annotation: Annotation, index: number) => {
    if (annotation.isSelected) {
      return annotation.points.map((point, pointIndex) => (
        <Rect
          key={`edge-point-${pointIndex}`}
          x={point.x - 4}
          y={point.y - 4}
          width={10}
          height={10}
          fill={"#84BFFE"}
          stroke={"white"}
          draggable
          onDragMove={(e) => {
            updatePoints(index, pointIndex, {
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = "pointer";
            }
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = "default";
            }
          }}
        />
      ));
    }
    return null;
  };

  const renderAnnotations = () => {
    return (
      <>
        {polygonHandlerRef.current.getAnnotations().map((ann, idx) => (
          <React.Fragment key={`annotation-fragment-${idx}`}>
            <Line
              key={`polygon-${idx}`}
              points={ann.points.flatMap((p) => [p.x, p.y])}
              stroke={ann.isSelected ? "#9FB1AE" : "white"}
              strokeWidth={2}
              dash={[5, 5]}
              closed={ann.closed}
              fill="#84BFFE"
              opacity={0.5}
            />
            {renderEditablePoints(ann, idx)}
          </React.Fragment>
        ))}
        {currentPoints.length > 0 && (
          <React.Fragment key={`current-polygon-fragment`}>
            <Line
              key={`current-polygon`}
              points={currentPoints.flatMap((p) => [p.x, p.y])}
              stroke="green"
              strokeWidth={2}
              closed={false}
            />
            {currentPoints.map((point, index) => (
              <Circle
                key={`edge-${index}`}
                x={point.x}
                y={point.y}
                radius={3}
                fill="yellow"
              />
            ))}
          </React.Fragment>
        )}
      </>
    );
  };

  const renderLabelOptions = () => {
    return labels.map((label, index) => (
      <div key={index}>
        <input
          type="radio"
          id={`label-${label.value}`}
          name="annotationLabel"
          value={label.value}
          checked={currentLabel?.value === label.value}
          onChange={handleLabelChange}
        />
        <label htmlFor={`label-${label.value}`}>{label.name}</label>
      </div>
    ));
  };

  return (
    <>
      {image && (
        <div
          ref={parentRef}
          className="bg-black text-white relative w-full h-full grid grid-cols-12"
        >
          {mode === "segmentation" && (
            <div className="flex items-start p-2 bg-white text-black shadow-md border col-span-1">
              <Button onClick={() => onSelectTool("polygon")} className="p-2">
                <Pentagon className="w-6 h-6" />
              </Button>
              {/* Other tool buttons... */}
            </div>
          )}

          <div
            className={`flex flex-col ${
              mode === "segmentation" ? "col-span-11" : "col-span-12"
            }`}
          >
            <div className="flex items-center justify-end p-2  bg-white text-black shadow-md border">
              <div className="flex gap-2 ">
                <Button onClick={goToPreviousImage}>Previous</Button>
                <Button onClick={goToNextImage}>Next</Button>
              </div>
            </div>
            <div className="bg-black text-white">
              <Stage
                key={"stage"}
                width={parentWidth}
                height={parentHeight}
                style={{ width: "100%", height: "100%" }}
                onMouseDown={handleMouseDown}
                onMouseEnter={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) {
                    container.style.cursor = "crosshair";
                  }
                }}
                onMouseLeave={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) {
                    container.style.cursor = "default";
                  }
                }}
              >
                <Layer>
                  <KonvaImage
                    key={"background-image"}
                    image={image}
                    x={imageX}
                    y={imageY}
                    width={image.width * scale}
                    height={image.height * scale}
                    draggable={false}
                  />

                  {renderAnnotations()}
                </Layer>
              </Stage>
              {annotations.map((annotation, index) => (
                <div
                  key={`anchor-${index}`}
                  className="absolute text-black group hover:cursor-pointer"
                  style={{
                    left: `${annotation.anchorPoint?.x}px`,
                    top: `${annotation.anchorPoint?.y}px`,
                  }}
                  onClick={() => {
                    polygonHandlerRef.current.selectPolygon(
                      annotation.isSelected ? -1 : index
                    );
                    setIsAnchorClicked(true);
                  }}
                >
                  <div
                    className="min-w-6 h-6 bg-white rounded-xl shadow-2xl p-2 m-auto flex items-center justify-center group-hover:cursor-pointer"
                    style={{ color: annotation.label?.color }}
                  >
                    <span className="leading-6 text-xs">
                      {annotation.label?.name}
                    </span>
                  </div>
                </div>
              ))}

              {isAnchorClicked && (
                <div
                  className="absolute text-black"
                  style={{
                    left: `${
                      polygonHandlerRef.current.selectedAnnotation()
                        ?.classificationBoxPoint?.x
                    }px`,
                    top: `${
                      polygonHandlerRef.current.selectedAnnotation()
                        ?.classificationBoxPoint?.y
                    }px`,
                  }}
                >
                  <div className="flex flex-col bg-white w-56 border rounded-md p-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-black">Classification</div>
                      <button
                        onClick={() => {
                          polygonHandlerRef.current.removeAnnotation();
                          setIsAnchorClicked(false);
                        }}
                        className=" text-white  p-2 rounded-full  group hover:bg-red-500"
                      >
                        <Trash2 className="w-4 h-4 text-black group-hover:text-white" />
                      </button>
                    </div>
                    <div>
                      <select
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                        value={currentLabel?.value || ""}
                        onChange={handleLabelChange}
                      >
                        {labels.map((label) => (
                          <option key={label.name} value={label.value}>
                            {label.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="pt-4">
                      <Button onClick={confirmChanges} variant="primary">
                        Confirm Changes
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center  p-2  bg-white text-black shadow-md border">
              <>
                {mode === "classification" && (
                  <div className="label-options">{renderLabelOptions()}</div>
                )}
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageAnnotationComponent;
