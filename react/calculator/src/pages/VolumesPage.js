import React, { useState } from "react";
import { Card, Form, Image, Row, Col, Button } from "react-bootstrap";

/**
 * Calculate the volume of a cube
 *
 * The function takes an object dimensions with property length, and
 * calculates the volume of the cube. It uses the formula:
 *
 * volume = length * length * length
 *
 * @param {object} dimensions with property length
 * @throws {Error} if the object does not contain a property length
 * @example calculateCubeVolume({length: 10})
 */
export function calculateCubeVolume(dimensions) {
  if (!dimensions.length) {
    throw new Error("The object does not contain a property length");
  }
  //prettier-ignore
  return dimensions.length * dimensions.length * dimensions.length;
}

// Add calculations for spheres, cones, cylinders, cuboids, and pyramids

/**
 * Calculate the volume of a sphere
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the sphere. It uses the formula:
 *
 * volume = 4/3 * pi * radius^3
 *
 * @param {object} dimensions with property radius
 * @throws {Error} if the object does not contain a property radius
 * @example calculateCubeVolume({radius: 10})
 */

export function calculateSphereVolume(dimensions) {
  if (!dimensions.radius) {
    throw new Error("The object does not contain a property radius");
  }
  //prettier-ignore
  return (4/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.radius;
}

/**
 * Calculate the volume of a cone
 * The function takes an object dimensions with property radius, and
 * calculates the volume of the cone. It uses the formula:
 *
 * volume = (1/3) * pi * radius^2 * height
 *
 * @param {object} dimensions with properties radius and height
 * @throws {Error} if the object does not contain a property radius and/or height
 * @example calculateConeVolume({radius: 10, height: 10})
 */

export function calculateConeVolume(dimensions) {
  if (!dimensions.radius || !dimensions.height) {
    throw new Error("The object does not contain a property radius or height");
  }
  //prettier-ignore
  return (1/3) * Math.PI * dimensions.radius * dimensions.radius * dimensions.height;
}

/**
 * Calculate the volume of a cylinder
 * The function takes an object dimensions with property radius and height and calculates the volume of the cylinder. It uses the formula:
 *
 * volume = pi * radius^2 * height
 *
 * @param {object} dimensions with properties radius and height
 * @throws {Error} if the object does not contain a property radius and/or height
 * @example calculateCylinderVolume({radius: 10, height: 10}
 */

export function calculateCylinderVolume(dimensions) {
  if (!dimensions.radius || !dimensions.height) {
    throw new Error("The object does not contain a property radius or height");
  }
  //prettier-ignore
  return Math.PI * dimensions.radius * dimensions.radius * dimensions.height;
}

// define list of shapes and their corresponding parameters to calculate volumes
const shapes = {
  Cube: {
    name: "Cube",
    dimensions: ["length"],
    formulaText: "length * length * length",
    image: "cube.svg",
    function: calculateCubeVolume,
  },
  Sphere: {
    name: "Sphere",
    dimensions: ["radius"],
    formulaText: "4/3 * pi * radius^3",
    image: "sphere.svg",
    function: calculateSphereVolume,
  },
  Cone: {
    name: "Cone",
    dimensions: ["radius", "height"],
    formulaText: "(1/3) * pi * radius^2 * height",
    image: "cone.svg",
    function: calculateConeVolume,
  },
  Cylinder: {
    name: "Cylinder",
    dimensions: ["radius", "height"],
    formulaText: "pi * radius^2 * height",
    image: "cylinder.svg",
    function: calculateCylinderVolume,
  },
};

// default shape and dimensions for the calculator page
const defaultShape = "Cube";
const defaultDimensions = { length: 1, height: 1, width: 1, radius: 1 };

// Render the volumes calclator page. It provides a dropdown
// to select the shape and text fields to enter the dimensions.
// The result is shown at the top.
//
// example:
//   <VolumesPage />

export default function VolumesPage() {
  const [result, setResult] = useState(1);
  const [shape, setShape] = useState(defaultShape);
  const [dimensions, setDimensions] = useState({ ...defaultDimensions });

  // calculate the volume of the shape and update the result
  const updateResult = (shape, dimensions) => {
    try {
      const volume = shapes[shape].function(dimensions);
      setResult(volume);
    } catch (error) {
      setResult(0);
    }
  };

  // invoked when the clear button is clicked
  const handleClear = () => {
    setShape(defaultShape);
    setDimensions({ ...defaultDimensions });
    updateResult(defaultShape, defaultDimensions);
  };

  // invoked when the shape dropdown value has changed
  const handleChangeShape = (newShape) => {
    setShape(newShape);
    updateResult(newShape, dimensions);
  };

  // invoked if the value of a dimension has changed
  // key: the name of the dimension
  // value: the new value for the dimension
  const handleChangeDimension = (key, value) => {
    let newDimensions = { ...dimensions, [key]: value };
    setDimensions(newDimensions);
    updateResult(shape, newDimensions);
  };

  // renders the volume calculator component
  return (
    <Card className="shadow" style={{ width: "400px" }}>
      <Form className="m-3">
        <Image
          className="position-relative start-50 translate-middle-x mx-auto mb-3"
          src={shapes[shape].image}
          style={{ height: "150px" }}
          fluid
        />
        <Form.Group as={Row} className="m-3">
          <Col sm={{ span: 10, offset: 1 }}>
            <div className="bg-black text-white text-end p-2 h2 text-nowrap overflow-hidden ">
              <div className="bg-black text-white text-end fs-6">
                {shapes[shape].formulaText + "="}
              </div>
              <span>
                {result
                  .toPrecision(4)
                  .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, "$1")}
              </span>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3" controlId="formVolumeData">
          <Form.Label column sm={3}>
            shape
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="select"
              value={shape}
              onChange={(event) => handleChangeShape(event.target.value)}
            >
              {Object.keys(shapes).map((key) => (
                <option key={key} value={key}>
                  {shapes[key].name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        {shapes[shape].dimensions.map((key) => (
          <Form.Group
            as={Row}
            className="m-3"
            controlId="formVolumeData"
            key={key}
          >
            <Form.Label column sm={3}>
              {key}
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                min="0"
                value={dimensions[key] || 0}
                onChange={(event) =>
                  handleChangeDimension(key, event.target.value)
                }
              />
            </Col>
          </Form.Group>
        ))}
        <Form.Group as={Row} className="m-3">
          <Col sm={{ span: 9, offset: 3 }}>
            <Button onClick={() => handleClear()}>Clear</Button>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  );
}
