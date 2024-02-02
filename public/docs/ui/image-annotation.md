# ImageAnnotationComponent Documentation

The `ImageAnnotationComponent` is a robust React component designed for annotating images within your application. Leveraging the `react-konva` library, it provides a rich set of functionalities for drawing, selecting, and editing polygon annotations on images. This component supports different annotation modes, such as segmentation and classification, making it versatile for various image processing tasks.

## Features

- **Polygon Annotation**: Users can draw polygon shapes to annotate parts of an image, useful for segmentation tasks.
- **Label Assignment**: Each annotation can be assigned a label from a predefined set, facilitating image classification and segmentation tasks.
- **Image Navigation**: Supports navigating through a series of images for annotation, including next and previous image functionality.
- **Scalability**: Automatically adjusts the image and annotations to fit within the component's dimensions, maintaining aspect ratio.
- **Interactive Editing**: Offers tools for editing annotations, including moving points and adjusting shapes.
- **Dynamic Labeling**: Allows for dynamic assignment of labels to annotations, supporting classification tasks.

## Props

- `imageUrls`: An array of image URLs for annotation. Each item in the array should contain an `id` and a `url` field.
- `labels`: An array of labels that can be assigned to annotations. Each label has a `name`, `value`, and `color` attribute.
- `mode`: A string indicating the annotation mode. Supports `"segmentation"` for drawing polygons around objects and `"classification"` for labeling entire images.

## Usage

### Basic Setup

To use the `ImageAnnotationComponent`, you must provide it with the necessary props:

```jsx
<ImageAnnotationComponent
  imageUrls={[{ id: '1', url: 'https://example.com/image1.jpg' }, { id: '2', url: 'https://example.com/image2.jpg' }]}
  labels={[
    { name: "Label 1", value: "label1", color: "red" },
    { name: "Label 2", value: "label2", color: "blue" }
  ]}
  mode="segmentation"
/>
```

### Annotation Modes

- **Segmentation Mode**: Allows users to draw polygons around areas of interest in the image. Ideal for object detection and segmentation tasks.
- **Classification Mode**: Users can assign labels to the entire image, useful for image classification projects.

## Key Functionalities

- **Drawing Polygons**: Click to start drawing a polygon. Click on the initial point to close the polygon.
- **Editing Annotations**: Select an existing polygon to edit its shape. Drag points to adjust the polygon's boundaries.
- **Label Assignment**: For each annotation, select a label from the predefined set to assign it to the polygon.
- **Navigating Images**: Use the "Next" and "Previous" buttons to move through the series of images provided in the `imageUrls` prop.

## Extending the Component

The `ImageAnnotationComponent` can be extended or customized to fit specific project needs:

- **Custom Tools**: Add custom annotation tools or functionalities specific to your application's requirements.
- **Image Loading States**: Implement loading indicators for better UX when images are being fetched or loaded.
- **Annotation Storage**: Integrate with backend services to save and retrieve annotations from a database.
- **Enhanced Label Management**: Provide options for adding, editing, or removing labels dynamically from the UI.

## Conclusion

The `ImageAnnotationComponent` offers a flexible and interactive solution for annotating images within React applications. By providing essential tools for both segmentation and classification, it caters to a wide range of image annotation needs. Customizable labels and easy navigation between images enhance its usability, making it a valuable tool for projects involving image processing and analysis.