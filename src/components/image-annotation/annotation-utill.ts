import { Point } from "./types";

class Utils {
    static getDistanceBetweenPoints = (p1: Point, p2: Point): number => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };

    static getAngleBetweenPoints = (p1: Point, p2: Point): number => {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };

    static getPointFromPolar = (p: Point, r: number, theta: number): Point => {
        return {
            x: p.x + r * Math.cos(theta),
            y: p.y + r * Math.sin(theta),
        };
    };

    static getPointOnLine = (
        p1: Point,
        p2: Point,
        distanceFromP1: number
    ): Point => {
        const distanceBetweenPoints = Utils.getDistanceBetweenPoints(p1, p2);
        const theta = Utils.getAngleBetweenPoints(p1, p2);
        const distanceRatio = distanceFromP1 / distanceBetweenPoints;
        return Utils.getPointFromPolar(
            p1,
            distanceRatio * distanceBetweenPoints,
            theta
        );
    };

    static getPointOnLineClosestTo = (p1: Point, p2: Point, p3: Point): Point => {
        const distanceBetweenPoints = Utils.getDistanceBetweenPoints(p1, p2);
        const theta = Utils.getAngleBetweenPoints(p1, p2);
        const distanceRatio =
            Utils.getDistanceBetweenPoints(p1, p3) / distanceBetweenPoints;
        return Utils.getPointFromPolar(
            p1,
            distanceRatio * distanceBetweenPoints,
            theta
        );
    };

    static getPointOnLineClosestToPerpendicular = (
        p1: Point,
        p2: Point,
        p3: Point
    ): Point => {
        const distanceBetweenPoints = Utils.getDistanceBetweenPoints(p1, p2);
        const theta = Utils.getAngleBetweenPoints(p1, p2);
        const perpendicularTheta = theta + Math.PI / 2;
        const distanceRatio =
            Utils.getDistanceBetweenPoints(p1, p3) / distanceBetweenPoints;
        return Utils.getPointFromPolar(
            p1,
            distanceRatio * distanceBetweenPoints,
            perpendicularTheta
        );
    };

    pointToLineDistance(point: Point, lineStart: Point, lineEnd: Point): number {
        // Calculate the differences
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;

        // Calculate the t that minimizes the distance.
        const t =
            ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) /
            (dx * dx + dy * dy);

        // Find the nearest point on the segment
        let nearestPoint;
        if (t < 0) {
            nearestPoint = lineStart;
        } else if (t > 1) {
            nearestPoint = lineEnd;
        } else {
            nearestPoint = { x: lineStart.x + t * dx, y: lineStart.y + t * dy };
        }

        // Calculate the distance
        return Math.sqrt(
            Math.pow(point.x - nearestPoint.x, 2) +
            Math.pow(point.y - nearestPoint.y, 2)
        );
    }
    calculateButtonPosition(points: Point[]): { x: number; y: number } {
        // Find the bottom-most point of the polygon
        let maxY = -Infinity;
        points.forEach((point) => {
            if (point.y > maxY) {
                maxY = point.y;
            }
        });

        // You can adjust the offset to position the button further below the polygon
        const offset = 90;
        return { x: points[0].x, y: maxY + offset };
    }

    calculateAnchorPoint(points: Point[]): Point {
        const firstPoint = points[0];
        return { x: firstPoint.x, y: firstPoint.y + 200 }; // Example calculation
    }

    generateUniqueId = () =>
        `annotation_${new Date().getTime()}_${Math.random()
            .toString(36)
            .slice(2, 11)}`;

    arePointsClose = (p1: Point, p2: Point, threshold = 10) => {
        return (
            Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) < threshold
        );
    };
}

export default Utils;