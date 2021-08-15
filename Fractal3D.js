//Diogo Daniel Nunes Fernande nº89221

//----------------------------------------------------------------------------
//
// Global Variables
//

var gl = null; // WebGL context

var shaderProgram = null;

var triangleVertexPositionBuffer = null;

var triangleVertexNormalBuffer = null;		//NEW

// The GLOBAL transformation parameters

var globalAngleYY = 0.0;

var globalAngleXX = 0.0;

var globalTz = 0.0;

// The local transformation parameters

// The translation vector

var tx = 0.0;

var ty = 0.0;

var tz = 0.0;

// The rotation angles in degrees

var angleXX = 0.0;

var angleYY = 0.0;

var angleZZ = 0.0;

// The scaling factors

var sx = 0.5;

var sy = 0.5;

var sz = 0.5;

//camera

// GLOBAL Animation controls

var globalRotationYY_ON = 0;

var globalRotationYY_DIR = 1;

var globalRotationYY_SPEED = 1;

var globalRotationXX_ON = 0;

var globalRotationXX_DIR = 1;

var globalRotationXX_SPEED = 1;

var pitch = 0;
var pitchRate = 0;

var yaw = 90;
var yawRate = 0;


var speed = 0;

var customLight = false;



// Local Animation controls
var rotationXX_ON = 1;

var rotationXX_DIR = 1;

var rotationXX_SPEED = 0.20;

var rotationYY_ON = 1;

var rotationYY_DIR = 1;

var rotationYY_SPEED = 0.20;

var rotationZZ_ON = 1;

var rotationZZ_DIR = 1;

var rotationZZ_SPEED = 0.20;
//camera controlls


var move_right = false;
var move_left = false;
var move_up = false;
var move_down = false;





// To allow choosing the way of drawing the model triangles

var primitiveType = null;

// To allow choosing the projection type

var projectionType = 1;

// NEW --- The viewer position

// It has to be updated according to the projection type

var pos_Viewer = [0.0, 0.0, 0, 1.0];

// NEW --- Model Material Features

// Ambient coef.


var kAmbi = [0.2, 0.2, 0.2];

// Difuse coef.

var kDiff = [0.7, 0.7, 0.7];

// Specular coef.

var kSpec = [0.7, 0.7, 0.7];

// Phong coef.

var nPhong = 100;


var condition_vertices = [];
var vertices = [

	// FRONTAL TRIANGLE


];

var normals = [

	// FRONTAL TRIANGLE

	0.0, 0.0, 1.0,

	0.0, 0.0, 1.0,

	0.0, 0.0, 1.0,
];


//----------------------------------------------------------------------------
//
// NEW - To count the number of frames per second (fps)
//

var elapsedTime = 0;

var frameCount = 0;

var lastfpsTime = new Date().getTime();;


function countFrames() {

	var now = new Date().getTime();

	frameCount++;

	elapsedTime += (now - lastfpsTime);

	lastfpsTime = now;

	if (elapsedTime >= 1000) {

		fps = frameCount;

		frameCount = 0;

		elapsedTime -= 1000;

		document.getElementById('fps').innerHTML = 'fps:' + fps;
	}
}


//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Vertex Coordinates and the Vertex Normal Vectors

function initBuffers() {

	// Vertex Coordinates

	triangleVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems = vertices.length / 3;

	// Associating to the vertex shader

	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
		triangleVertexPositionBuffer.itemSize,
		gl.FLOAT, false, 0, 0);

	// Vertex Normal Vectors

	triangleVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	triangleVertexNormalBuffer.itemSize = 3;
	triangleVertexNormalBuffer.numItems = normals.length / 3;

	// Associating to the vertex shader

	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute,
		triangleVertexNormalBuffer.itemSize,
		gl.FLOAT, false, 0, 0);
}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel(angleXX, angleYY, angleZZ,
	sx, sy, sz,
	tx, ty, tz,
	mvMatrix,
	primitiveType) {

	// The the global model transformation is an input

	// Concatenate with the particular model transformations




	// Pay attention to transformation order !!








	mvMatrix = mult(mvMatrix, translationMatrix(-2.5, 0, 0));

	mvMatrix = mult(mvMatrix, rotationXXMatrix(angleXX));

	mvMatrix = mult(mvMatrix, rotationYYMatrix(angleYY));




	// Passing the Model View Matrix to apply the current transformation

	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));





	// Associating the data to the vertex shader

	// This can be done in a better way !!

	// Vertex Coordinates and Vertex Normal Vectors

	initBuffers();

	// Material properties

	gl.uniform3fv(gl.getUniformLocation(shaderProgram, "k_ambient"),
		flatten(kAmbi));

	gl.uniform3fv(gl.getUniformLocation(shaderProgram, "k_diffuse"),
		flatten(kDiff));

	gl.uniform3fv(gl.getUniformLocation(shaderProgram, "k_specular"),
		flatten(kSpec));

	gl.uniform1f(gl.getUniformLocation(shaderProgram, "shininess"),
		nPhong);

	// Light Sources

	var numLights = lightSources.length;

	gl.uniform1i(gl.getUniformLocation(shaderProgram, "numLights"),
		numLights);



	//Light Sources

	for (var i = 0; i < lightSources.length; i++) {
		gl.uniform1i(gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].isOn"),
			lightSources[i].isOn);

		gl.uniform4fv(gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].position"),
			flatten(lightSources[i].getPosition()));

		gl.uniform3fv(gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].intensities"),
			flatten(lightSources[i].getIntensity()));
	}

	// Drawing 

	// primitiveType allows drawing as filled triangles / wireframe / vertices

	if (primitiveType == gl.LINE_LOOP) {

		// To simulate wireframe drawing!

		// No faces are defined! There are no hidden lines!

		// Taking the vertices 3 by 3 and drawing a LINE_LOOP

		var i;

		for (i = 0; i < triangleVertexPositionBuffer.numItems / 3; i++) {

			gl.drawArrays(primitiveType, 3 * i, 3);
		}
	}
	else {

		gl.drawArrays(primitiveType, 0, triangleVertexPositionBuffer.numItems);

	}
}

//----------------------------------------------------------------------------

//  Drawing the 3D scene

function drawScene() {

	var pMatrix;
	var mvMatrix = mat4();
	var viewMatrix = mat4();


	// Clearing the frame-buffer and the depth-buffer

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Computing the Projection Matrix
	//perpesctive-----------------------------

	// Viewer is at (0,0,0)

	// Ensure that the model is "inside" the view volume
	//pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );		




	pMatrix = perspective(45, 1, 0.05, 100);
	// Passing the Projection Matrix to apply the current projection

	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");

	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));




	// NEW --- Passing the viewer position to the vertex shader
	//gl.uniform4fv( gl.getUniformLocation(shaderProgram, "pos_Viewer"), flatten(pos_Viewer) );


	// GLOBAL TRANSFORMATION FOR THE WHOLE SCENE

	viewMatrix = mult(viewMatrix, rotationXXMatrix(-pitch));

	viewMatrix = mult(viewMatrix, rotationYYMatrix(-yaw));

	viewMatrix = mult(viewMatrix, translationMatrix(tx, ty, tz));
	mvMatrix = mult(viewMatrix, mvMatrix);



	// NEW - Updating the position of the light sources, if required

	// FOR EACH LIGHT SOURCE

	for (var i = 0; i < lightSources.length; i++) {
		// Animating the light source, if defined

		var lightSourceMatrix = mat4();

		if (!lightSources[i].isOff()) {

			if (customLight) {
				
				lightSourceMatrix = mult(
					lightSourceMatrix,
					rotationYYMatrix(lightSources[i].getRotAngleYY()));

				lightSourceMatrix = mult(
					lightSourceMatrix,
					rotationXXMatrix(lightSources[i].getRotAngleXX()));

			}
			else {
				//static
				if (lightSources[i].isRotXXOn()) {

					lightSourceMatrix = mult(lightSourceMatrix, rotationXXMatrix(-pitch));

				}
				if (lightSources[i].isRotYYOn()) {


					lightSourceMatrix = mult(lightSourceMatrix, rotationYYMatrix(-yaw));


				}
				lightSourceMatrix = mult(lightSourceMatrix, translationMatrix(tx, ty, tz));


			}



		}

		// NEW Passing the Light Souree Matrix to apply

		var lsmUniform = gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].lightSourceMatrix");

		gl.uniformMatrix4fv(lsmUniform, false, new Float32Array(flatten(lightSourceMatrix)));
	}

	// Instantianting the current model

	drawModel(angleXX, angleYY, angleZZ,
		sx, sy, sz,
		tx, ty, tz,
		mvMatrix,
		primitiveType);





	// NEW - Counting the frames

	countFrames();

}

//----------------------------------------------------------------------------
//
//  NEW --- Animation
//

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate() {

	var timeNow = new Date().getTime();

	if (lastTime != 0) {

		var elapsed = timeNow - lastTime;

		// Global rotation
		if (speed != 0) {

			mx = Math.sin(radians(yaw)) * speed * elapsed;
			mz = Math.cos(radians(yaw)) * speed * elapsed;

			m2x = Math.sin(radians(pitch)) * speed * elapsed;
			m2z = Math.sin(radians(pitch)) * speed * elapsed;
			my = Math.sin(radians(pitch)) * speed * elapsed;

			//mz = Math.cos(radians(pitch))* speed * elapsed;


			//dumb way to implement moving camera
			if (pitch > 0) {
				if (yaw > 225 && yaw < 315 || yaw > -45 && yaw < 0) {//back
					tx += mx + m2x;
					tz += mz;
					ty -= my;

				}
				if (yaw > 315 && yaw < 405 || yaw > 0 && yaw < 45) {//right
					tx += mx;
					tz += mz - m2z;
					ty -= my;


				}

				if (yaw > 45 && yaw < 135 || yaw > 405 && yaw < 450 || yaw > -270 && yaw < -225) {//front
					tx += mx - m2x;
					tz += mz;
					ty -= my;

				}
				if (yaw > 135 && yaw < 225 || yaw > -135 && yaw < -45) {//left
					tx += mx;
					tz += mz + m2z;
					ty -= my;


				}
			} else {
				if (yaw > 225 && yaw < 315 || yaw > -45 && yaw < 0) {//back
					tx += mx - m2x;
					tz += mz;
					ty -= my;

				}
				if (yaw > 315 && yaw < 405 || yaw > 0 && yaw < 45) {//right
					tx += mx;
					tz += mz + m2z;
					ty -= my;


				}

				if (yaw > 45 && yaw < 135 || yaw > 405 && yaw < 450 || yaw > -270 && yaw < -225) {//front
					tx += mx + m2x;
					tz += mz;
					ty -= my;

				}
				if (yaw > 135 && yaw < 225 || yaw > -135 && yaw < -45) {//left
					tx += mx;
					tz += mz - m2z;
					ty -= my;


				}


			}

		}


		if (move_right) {
			tz += Math.sin(radians(yaw)) * 0.03;
			tx -= Math.cos(radians(yaw)) * 0.03;


		}
		if (move_left) {
			tz += Math.sin(radians(yaw)) * -0.03;
			tx -= Math.cos(radians(yaw)) * -0.03;
		}

		if (move_up) {
			ty -= Math.cos(radians(pitch)) * 0.03;
			tx += Math.sin(radians(pitch)) * 0.03;
		}
		if (move_down) {
			ty -= Math.cos(radians(pitch)) * -0.03;
			tx += Math.sin(radians(pitch)) * -0.03;

		}


		yaw += yawRate * elapsed;
		if (yaw <= -270) yaw = 90;
		if (yaw >= 450) yaw = 90;

		//avoid doing 360 rotations when you look up and down
		if (pitch > 90) {
			pitch = 90;
		}
		else if (pitch < -90) {
			pitch = -90;
		}
		else {
			pitch += pitchRate * elapsed;
		}

		// Local rotations
		if (globalRotationXX_ON) {

			globalAngleXX += globalRotationXX_DIR * globalRotationXX_SPEED * (90 * elapsed) / 1000.0;
		}
		if (globalRotationYY_ON) {

			globalAngleYY += globalRotationYY_DIR * globalRotationYY_SPEED * (90 * elapsed) / 1000.0;
		}


		//movement


		// Rotating the light sources

		for (var i = 0; i < lightSources.length; i++) {
			if (lightSources[i].isRotYYOn()) {

				var angle = lightSources[i].getRotAngleYY() + lightSources[i].getRotationSpeed() * (90 * elapsed) / 1000.0;

				lightSources[i].setRotAngleYY(angle);

				angle = lightSources[i].getRotAngleXX() + lightSources[i].getRotationSpeed() * (90 * elapsed) / 1000.0;
				lightSources[i].setRotAngleXX(angle);
			}
		}
	}

	lastTime = timeNow;
}


//----------------------------------------------------------------------------

// Timer

function tick() {

	requestAnimFrame(tick);

	drawScene();

	animate();
}


//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos() {

}




// Recursive functions to render fractals, inspired by existing examples

// Tetrahedron Koch Snowflake--------------------------------------------------------
function KochSnowflake(p1, p2, p3, p4, count) {

	divide_face(p1, p2, p3, count);

	divide_face(p3, p2, p4, count);

	divide_face(p1, p4, p2, count);

	divide_face(p1, p3, p4, count);

	tetrahedron(p1, p2, p3, p4);

}

function divide_face(p1, p2, p3, count) {

	if (count > 0) {
		var pa = computeMidPoint(p1, p2);

		var pb = computeMidPoint(p2, p3);

		var pc = computeMidPoint(p1, p3);

		// Calculate the centroid

		var midpoint = computeCentroid(pa, pb, pc);

		//Descobrir o vetor normal unitario a face 
		var normal = computeNormalVector(p1, p2, p3);

		//top point
		var h = triangleHeight(distance(pa, pb));
		normal[0] = normal[0] * h;
		normal[1] = normal[1] * h;
		normal[2] = normal[2] * h;
		var pt = [midpoint[0] + normal[0], midpoint[1] + normal[1], midpoint[2] + normal[2]];
		count -= 1;

		divide_face(pa, pb, pt, count);
		divide_face(pa, pt, pc, count);
		divide_face(pb, pc, pt, count);


		tetrahedron(pb, pc, pt, pa);
	} else { return; }




}
function triangleHeight(edge) {
	return (edge / 2) * Math.sqrt(3);

}
function distance(p1, p2) {
	return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[2] - p1[2], 2));

}




//jerusalem cube---------------------------------------------
function jerusalemCube(p1, p2, p3, p4, p5, p6, p7, p8, count) {
	if (count < 1) {
		cube(p1, p2, p3, p4, p5, p6, p7, p8);
	}
	else {
		count--;

		var dist = distance(p3, p4);
		var smallCube = (1 / 6) * dist;
		var bigCube = (dist - smallCube) / 2;

		// Front face cubes
		var front_top_left_1 = [p4[0], p4[1] - bigCube, p4[2]];
		var front_top_left_2 = [p4[0] + bigCube, p4[1] - bigCube, p4[2]];
		var front_top_left_3 = [p4[0] + bigCube, p4[1], p4[2]];
		var front_top_left_4 = p4;
		var front_top_left_5 = [front_top_left_1[0], front_top_left_1[1], front_top_left_1[2] - bigCube];
		var front_top_left_6 = [front_top_left_2[0], front_top_left_2[1], front_top_left_2[2] - bigCube];
		var front_top_left_7 = [front_top_left_3[0], front_top_left_3[1], front_top_left_3[2] - bigCube];
		var front_top_left_8 = [front_top_left_4[0], front_top_left_4[1], front_top_left_4[2] - bigCube];

		var front_top_center_1 = [p4[0] + bigCube, p4[1] - smallCube, p4[2]];
		var front_top_center_2 = [p4[0] + bigCube + smallCube, p4[1] - smallCube, p4[2]];
		var front_top_center_3 = [p4[0] + bigCube + smallCube, p4[1], p4[2]];
		var front_top_center_4 = [p4[0] + bigCube, p4[1], p4[2]];
		var front_top_center_5 = [front_top_center_1[0], front_top_center_1[1], front_top_center_1[2] - smallCube];
		var front_top_center_6 = [front_top_center_2[0], front_top_center_2[1], front_top_center_2[2] - smallCube];
		var front_top_center_7 = [front_top_center_3[0], front_top_center_3[1], front_top_center_3[2] - smallCube];
		var front_top_center_8 = [front_top_center_4[0], front_top_center_4[1], front_top_center_4[2] - smallCube];

		var front_top_right_1 = [p3[0] - bigCube, p3[1] - bigCube, p3[2]];;
		var front_top_right_2 = [p3[0], p3[1] - bigCube, p4[2]];
		var front_top_right_3 = p3;
		var front_top_right_4 = [p3[0] - bigCube, p3[1], p3[2]];
		var front_top_right_5 = [front_top_right_1[0], front_top_right_1[1], front_top_right_1[2] - bigCube];
		var front_top_right_6 = [front_top_right_2[0], front_top_right_2[1], front_top_right_2[2] - bigCube];
		var front_top_right_7 = [front_top_right_3[0], front_top_right_3[1], front_top_right_3[2] - bigCube];
		var front_top_right_8 = [front_top_right_4[0], front_top_right_4[1], front_top_right_4[2] - bigCube];

		var front_mid_left_1 = [p4[0], p4[1] - bigCube - smallCube, p4[2]];
		var front_mid_left_2 = [p4[0] + smallCube, p4[1] - bigCube - smallCube, p4[2]];
		var front_mid_left_3 = [p4[0] + smallCube, p4[1] - bigCube, p4[2]];
		var front_mid_left_4 = [p4[0], p4[1] - bigCube, p4[2]];
		var front_mid_left_5 = [front_mid_left_1[0], front_mid_left_1[1], front_mid_left_1[2] - smallCube];
		var front_mid_left_6 = [front_mid_left_2[0], front_mid_left_2[1], front_mid_left_2[2] - smallCube];
		var front_mid_left_7 = [front_mid_left_3[0], front_mid_left_3[1], front_mid_left_3[2] - smallCube];
		var front_mid_left_8 = [front_mid_left_4[0], front_mid_left_4[1], front_mid_left_4[2] - smallCube];

		var front_mid_right_1 = [p3[0] - smallCube, p3[1] - bigCube - smallCube, p3[2]];
		var front_mid_right_2 = [p3[0], p3[1] - bigCube - smallCube, p3[2]];
		var front_mid_right_3 = [p3[0], p3[1] - bigCube, p3[2]];
		var front_mid_right_4 = [p3[0] - smallCube, p3[1] - bigCube, p3[2]];
		var front_mid_right_5 = [front_mid_right_1[0], front_mid_right_1[1], front_mid_right_1[2] - smallCube];
		var front_mid_right_6 = [front_mid_right_2[0], front_mid_right_2[1], front_mid_right_2[2] - smallCube];
		var front_mid_right_7 = [front_mid_right_3[0], front_mid_right_3[1], front_mid_right_3[2] - smallCube];
		var front_mid_right_8 = [front_mid_right_4[0], front_mid_right_4[1], front_mid_right_4[2] - smallCube];

		var front_bot_left_1 = p1;
		var front_bot_left_2 = [p1[0] + bigCube, p1[1], p1[2]];
		var front_bot_left_3 = [p1[0] + bigCube, p1[1] + bigCube, p1[2]];
		var front_bot_left_4 = [p1[0], p1[1] + bigCube, p1[2]];
		var front_bot_left_5 = [front_bot_left_1[0], front_bot_left_1[1], front_bot_left_1[2] - bigCube];
		var front_bot_left_6 = [front_bot_left_2[0], front_bot_left_2[1], front_bot_left_2[2] - bigCube];
		var front_bot_left_7 = [front_bot_left_3[0], front_bot_left_3[1], front_bot_left_3[2] - bigCube];
		var front_bot_left_8 = [front_bot_left_4[0], front_bot_left_4[1], front_bot_left_4[2] - bigCube];

		var front_bot_center_1 = [p1[0] + bigCube, p1[1], p1[2]];
		var front_bot_center_2 = [p1[0] + bigCube + smallCube, p1[1], p1[2]];
		var front_bot_center_3 = [p1[0] + bigCube + smallCube, p1[1] + smallCube, p1[2]];
		var front_bot_center_4 = [p1[0] + bigCube, p1[1] + smallCube, p1[2]];
		var front_bot_center_5 = [front_bot_center_1[0], front_bot_center_1[1], front_bot_center_1[2] - smallCube];
		var front_bot_center_6 = [front_bot_center_2[0], front_bot_center_2[1], front_bot_center_2[2] - smallCube];
		var front_bot_center_7 = [front_bot_center_3[0], front_bot_center_3[1], front_bot_center_3[2] - smallCube];
		var front_bot_center_8 = [front_bot_center_4[0], front_bot_center_4[1], front_bot_center_4[2] - smallCube];

		var front_bot_right_1 = [p2[0] - bigCube, p2[1], p2[2]];
		var front_bot_right_2 = p2;
		var front_bot_right_3 = [p2[0], p2[1] + bigCube, p2[2]];
		var front_bot_right_4 = [p2[0] - bigCube, p2[1] + bigCube, p2[2]];
		var front_bot_right_5 = [front_bot_right_1[0], front_bot_right_1[1], front_bot_right_1[2] - bigCube];
		var front_bot_right_6 = [front_bot_right_2[0], front_bot_right_2[1], front_bot_right_2[2] - bigCube];
		var front_bot_right_7 = [front_bot_right_3[0], front_bot_right_3[1], front_bot_right_3[2] - bigCube];
		var front_bot_right_8 = [front_bot_right_4[0], front_bot_right_4[1], front_bot_right_4[2] - bigCube];

		// Mid cubes
		var mid_top_left_1 = [p4[0], p4[1] - smallCube, p4[2] - bigCube];
		var mid_top_left_2 = [p4[0] + smallCube, p4[1] - smallCube, p4[2] - bigCube];
		var mid_top_left_3 = [p4[0] + smallCube, p4[1], p4[2] - bigCube];
		var mid_top_left_4 = [p4[0], p4[1], p4[2] - bigCube];
		var mid_top_left_5 = [mid_top_left_1[0], mid_top_left_1[1], mid_top_left_1[2] - smallCube];
		var mid_top_left_6 = [mid_top_left_2[0], mid_top_left_2[1], mid_top_left_2[2] - smallCube];
		var mid_top_left_7 = [mid_top_left_3[0], mid_top_left_3[1], mid_top_left_3[2] - smallCube];
		var mid_top_left_8 = [mid_top_left_4[0], mid_top_left_4[1], mid_top_left_4[2] - smallCube];

		var mid_top_right_1 = [p3[0] - smallCube, p3[1] - smallCube, p3[2] - bigCube];
		var mid_top_right_2 = [p3[0], p3[1] - smallCube, p3[2] - bigCube];
		var mid_top_right_3 = [p3[0], p3[1], p3[2] - bigCube];
		var mid_top_right_4 = [p3[0] - smallCube, p3[1], p3[2] - bigCube];
		var mid_top_right_5 = [mid_top_right_1[0], mid_top_right_1[1], mid_top_right_1[2] - smallCube];
		var mid_top_right_6 = [mid_top_right_2[0], mid_top_right_2[1], mid_top_right_2[2] - smallCube];
		var mid_top_right_7 = [mid_top_right_3[0], mid_top_right_3[1], mid_top_right_3[2] - smallCube];
		var mid_top_right_8 = [mid_top_right_4[0], mid_top_right_4[1], mid_top_right_4[2] - smallCube];

		var mid_bot_left_1 = [p1[0], p1[1], p2[2] - bigCube];
		var mid_bot_left_2 = [p1[0] + smallCube, p1[1], p1[2] - bigCube];
		var mid_bot_left_3 = [p1[0] + smallCube, p1[1] + smallCube, p1[2] - bigCube];
		var mid_bot_left_4 = [p1[0], p1[1] + smallCube, p1[2] - bigCube];
		var mid_bot_left_5 = [mid_bot_left_1[0], mid_bot_left_1[1], mid_bot_left_1[2] - smallCube];
		var mid_bot_left_6 = [mid_bot_left_2[0], mid_bot_left_2[1], mid_bot_left_2[2] - smallCube];
		var mid_bot_left_7 = [mid_bot_left_3[0], mid_bot_left_3[1], mid_bot_left_3[2] - smallCube];
		var mid_bot_left_8 = [mid_bot_left_4[0], mid_bot_left_4[1], mid_bot_left_4[2] - smallCube];

		var mid_bot_right_1 = [p2[0] - smallCube, p2[1], p2[2] - bigCube];
		var mid_bot_right_2 = [p2[0], p2[1], p2[2] - bigCube];
		var mid_bot_right_3 = [p2[0], p2[1] + smallCube, p2[2] - bigCube];
		var mid_bot_right_4 = [p2[0] - smallCube, p2[1] + smallCube, p2[2] - bigCube];
		var mid_bot_right_5 = [mid_bot_right_1[0], mid_bot_right_1[1], mid_bot_right_1[2] - smallCube];
		var mid_bot_right_6 = [mid_bot_right_2[0], mid_bot_right_2[1], mid_bot_right_2[2] - smallCube];
		var mid_bot_right_7 = [mid_bot_right_3[0], mid_bot_right_3[1], mid_bot_right_3[2] - smallCube];
		var mid_bot_right_8 = [mid_bot_right_4[0], mid_bot_right_4[1], mid_bot_right_4[2] - smallCube];

		// Back cubes
		var back_top_left_1 = [p4[0], p4[1] - bigCube, p4[2] - bigCube - smallCube];
		var back_top_left_2 = [p4[0] + bigCube, p4[1] - bigCube, p4[2] - bigCube - smallCube];
		var back_top_left_3 = [p4[0] + bigCube, p4[1], p4[2] - bigCube - smallCube];
		var back_top_left_4 = [p4[0], p4[1], p4[2] - bigCube - smallCube];
		var back_top_left_5 = [back_top_left_1[0], back_top_left_1[1], back_top_left_1[2] - bigCube];
		var back_top_left_6 = [back_top_left_2[0], back_top_left_2[1], back_top_left_2[2] - bigCube];
		var back_top_left_7 = [back_top_left_3[0], back_top_left_3[1], back_top_left_3[2] - bigCube];
		var back_top_left_8 = [back_top_left_4[0], back_top_left_4[1], back_top_left_4[2] - bigCube];

		var back_top_center_1 = [p4[0] + bigCube, p4[1] - smallCube, p4[2] - (5 * smallCube)];
		var back_top_center_2 = [p4[0] + bigCube + smallCube, p4[1] - smallCube, p4[2] - (5 * smallCube)];
		var back_top_center_3 = [p4[0] + bigCube + smallCube, p4[1], p4[2] - (5 * smallCube)];
		var back_top_center_4 = [p4[0] + bigCube, p4[1], p4[2] - (5 * smallCube)];
		var back_top_center_5 = [back_top_center_1[0], back_top_center_1[1], back_top_center_1[2] - smallCube];
		var back_top_center_6 = [back_top_center_2[0], back_top_center_2[1], back_top_center_2[2] - smallCube];
		var back_top_center_7 = [back_top_center_3[0], back_top_center_3[1], back_top_center_3[2] - smallCube];
		var back_top_center_8 = [back_top_center_4[0], back_top_center_4[1], back_top_center_4[2] - smallCube];

		var back_top_right_1 = [p3[0] - bigCube, p3[1] - bigCube, p3[2] - bigCube - smallCube];;
		var back_top_right_2 = [p3[0], p3[1] - bigCube, p4[2] - bigCube - smallCube];
		var back_top_right_3 = [p3[0], p3[1], p3[2] - bigCube - smallCube];
		var back_top_right_4 = [p3[0] - bigCube, p3[1], p3[2] - bigCube - smallCube];
		var back_top_right_5 = [back_top_right_1[0], back_top_right_1[1], back_top_right_1[2] - bigCube];
		var back_top_right_6 = [back_top_right_2[0], back_top_right_2[1], back_top_right_2[2] - bigCube];
		var back_top_right_7 = [back_top_right_3[0], back_top_right_3[1], back_top_right_3[2] - bigCube];
		var back_top_right_8 = [back_top_right_4[0], back_top_right_4[1], back_top_right_4[2] - bigCube];

		var back_mid_left_1 = [p4[0], p4[1] - bigCube - smallCube, p4[2] - (2 * bigCube)];
		var back_mid_left_2 = [p4[0] + smallCube, p4[1] - bigCube - smallCube, p4[2] - (2 * bigCube)];
		var back_mid_left_3 = [p4[0] + smallCube, p4[1] - bigCube, p4[2] - (2 * bigCube)];
		var back_mid_left_4 = [p4[0], p4[1] - bigCube, p4[2] - (2 * bigCube)];
		var back_mid_left_5 = [back_mid_left_1[0], back_mid_left_1[1], back_mid_left_1[2] - smallCube];
		var back_mid_left_6 = [back_mid_left_2[0], back_mid_left_2[1], back_mid_left_2[2] - smallCube];
		var back_mid_left_7 = [back_mid_left_3[0], back_mid_left_3[1], back_mid_left_3[2] - smallCube];
		var back_mid_left_8 = [back_mid_left_4[0], back_mid_left_4[1], back_mid_left_4[2] - smallCube];

		var back_mid_right_1 = [p3[0] - smallCube, p3[1] - bigCube - smallCube, p3[2] - (2 * bigCube)];
		var back_mid_right_2 = [p3[0], p3[1] - bigCube - smallCube, p3[2] - (2 * bigCube)];
		var back_mid_right_3 = [p3[0], p3[1] - bigCube, p3[2] - (2 * bigCube)];
		var back_mid_right_4 = [p3[0] - smallCube, p3[1] - bigCube, p3[2] - (2 * bigCube)];
		var back_mid_right_5 = [back_mid_right_1[0], back_mid_right_1[1], back_mid_right_1[2] - smallCube];
		var back_mid_right_6 = [back_mid_right_2[0], back_mid_right_2[1], back_mid_right_2[2] - smallCube];
		var back_mid_right_7 = [back_mid_right_3[0], back_mid_right_3[1], back_mid_right_3[2] - smallCube];
		var back_mid_right_8 = [back_mid_right_4[0], back_mid_right_4[1], back_mid_right_4[2] - smallCube];

		var back_bot_left_1 = [p1[0], p1[1], p1[2] - bigCube - smallCube];
		var back_bot_left_2 = [p1[0] + bigCube, p1[1], p1[2] - bigCube - smallCube];
		var back_bot_left_3 = [p1[0] + bigCube, p1[1] + bigCube, p1[2] - bigCube - smallCube];
		var back_bot_left_4 = [p1[0], p1[1] + bigCube, p1[2] - bigCube - smallCube];
		var back_bot_left_5 = [back_bot_left_1[0], back_bot_left_1[1], back_bot_left_1[2] - bigCube];
		var back_bot_left_6 = [back_bot_left_2[0], back_bot_left_2[1], back_bot_left_2[2] - bigCube];
		var back_bot_left_7 = [back_bot_left_3[0], back_bot_left_3[1], back_bot_left_3[2] - bigCube];
		var back_bot_left_8 = [back_bot_left_4[0], back_bot_left_4[1], back_bot_left_4[2] - bigCube];

		var back_bot_center_1 = [p1[0] + bigCube, p1[1], p1[2] - (5 * smallCube)];
		var back_bot_center_2 = [p1[0] + bigCube + smallCube, p1[1], p1[2] - (5 * smallCube)];
		var back_bot_center_3 = [p1[0] + bigCube + smallCube, p1[1] + smallCube, p1[2] - (5 * smallCube)];
		var back_bot_center_4 = [p1[0] + bigCube, p1[1] + smallCube, p1[2] - (5 * smallCube)];
		var back_bot_center_5 = [back_bot_center_1[0], back_bot_center_1[1], back_bot_center_1[2] - smallCube];
		var back_bot_center_6 = [back_bot_center_2[0], back_bot_center_2[1], back_bot_center_2[2] - smallCube];
		var back_bot_center_7 = [back_bot_center_3[0], back_bot_center_3[1], back_bot_center_3[2] - smallCube];
		var back_bot_center_8 = [back_bot_center_4[0], back_bot_center_4[1], back_bot_center_4[2] - smallCube];

		var back_bot_right_1 = [p2[0] - bigCube, p2[1], p2[2] - bigCube - smallCube];
		var back_bot_right_2 = [p2[0], p2[1], p2[2] - bigCube - smallCube];
		var back_bot_right_3 = [p2[0], p2[1] + bigCube, p2[2] - bigCube - smallCube];
		var back_bot_right_4 = [p2[0] - bigCube, p2[1] + bigCube, p2[2] - bigCube - smallCube];
		var back_bot_right_5 = [back_bot_right_1[0], back_bot_right_1[1], back_bot_right_1[2] - bigCube];
		var back_bot_right_6 = [back_bot_right_2[0], back_bot_right_2[1], back_bot_right_2[2] - bigCube];
		var back_bot_right_7 = [back_bot_right_3[0], back_bot_right_3[1], back_bot_right_3[2] - bigCube];
		var back_bot_right_8 = [back_bot_right_4[0], back_bot_right_4[1], back_bot_right_4[2] - bigCube];


		jerusalemCube(front_top_left_1, front_top_left_2, front_top_left_3, front_top_left_4, front_top_left_5, front_top_left_6, front_top_left_7, front_top_left_8, count);
		jerusalemCube(front_top_center_1, front_top_center_2, front_top_center_3, front_top_center_4, front_top_center_5, front_top_center_6, front_top_center_7, front_top_center_8, count);
		jerusalemCube(front_top_right_1, front_top_right_2, front_top_right_3, front_top_right_4, front_top_right_5, front_top_right_6, front_top_right_7, front_top_right_8, count);
		jerusalemCube(front_mid_left_1, front_mid_left_2, front_mid_left_3, front_mid_left_4, front_mid_left_5, front_mid_left_6, front_mid_left_7, front_mid_left_8, count);
		jerusalemCube(front_mid_right_1, front_mid_right_2, front_mid_right_3, front_mid_right_4, front_mid_right_5, front_mid_right_6, front_mid_right_7, front_mid_right_8, count);
		jerusalemCube(front_bot_left_1, front_bot_left_2, front_bot_left_3, front_bot_left_4, front_bot_left_5, front_bot_left_6, front_bot_left_7, front_bot_left_8, count);
		jerusalemCube(front_bot_center_1, front_bot_center_2, front_bot_center_3, front_bot_center_4, front_bot_center_5, front_bot_center_6, front_bot_center_7, front_bot_center_8, count);
		jerusalemCube(front_bot_right_1, front_bot_right_2, front_bot_right_3, front_bot_right_4, front_bot_right_5, front_bot_right_6, front_bot_right_7, front_bot_right_8, count);

		jerusalemCube(mid_top_left_1, mid_top_left_2, mid_top_left_3, mid_top_left_4, mid_top_left_5, mid_top_left_6, mid_top_left_7, mid_top_left_8, count);
		jerusalemCube(mid_top_right_1, mid_top_right_2, mid_top_right_3, mid_top_right_4, mid_top_right_5, mid_top_right_6, mid_top_right_7, mid_top_right_8, count);
		jerusalemCube(mid_bot_left_1, mid_bot_left_2, mid_bot_left_3, mid_bot_left_4, mid_bot_left_5, mid_bot_left_6, mid_bot_left_7, mid_bot_left_8, count);
		jerusalemCube(mid_bot_right_1, mid_bot_right_2, mid_bot_right_3, mid_bot_right_4, mid_bot_right_5, mid_bot_right_6, mid_bot_right_7, mid_bot_right_8, count);

		jerusalemCube(back_top_left_1, back_top_left_2, back_top_left_3, back_top_left_4, back_top_left_5, back_top_left_6, back_top_left_7, back_top_left_8, count);
		jerusalemCube(back_top_center_1, back_top_center_2, back_top_center_3, back_top_center_4, back_top_center_5, back_top_center_6, back_top_center_7, back_top_center_8, count);
		jerusalemCube(back_top_right_1, back_top_right_2, back_top_right_3, back_top_right_4, back_top_right_5, back_top_right_6, back_top_right_7, back_top_right_8, count);
		jerusalemCube(back_mid_left_1, back_mid_left_2, back_mid_left_3, back_mid_left_4, back_mid_left_5, back_mid_left_6, back_mid_left_7, back_mid_left_8, count);
		jerusalemCube(back_mid_right_1, back_mid_right_2, back_mid_right_3, back_mid_right_4, back_mid_right_5, back_mid_right_6, back_mid_right_7, back_mid_right_8, count);
		jerusalemCube(back_bot_left_1, back_bot_left_2, back_bot_left_3, back_bot_left_4, back_bot_left_5, back_bot_left_6, back_bot_left_7, back_bot_left_8, count);
		jerusalemCube(back_bot_center_1, back_bot_center_2, back_bot_center_3, back_bot_center_4, back_bot_center_5, back_bot_center_6, back_bot_center_7, back_bot_center_8, count);
		jerusalemCube(back_bot_right_1, back_bot_right_2, back_bot_right_3, back_bot_right_4, back_bot_right_5, back_bot_right_6, back_bot_right_7, back_bot_right_8, count);
	}
}








//sierpinski pyramid----------------------------------------------------------------------------
function divide_tetrahedron(p1, p2, p3, p4, count) {

	var p1_p2 = computeMidPoint(p1, p2);
	var p1_p3 = computeMidPoint(p1, p3);
	var p1_p4 = computeMidPoint(p1, p4);
	var p2_p3 = computeMidPoint(p2, p3);
	var p2_p4 = computeMidPoint(p2, p4);
	var p3_p4 = computeMidPoint(p3, p4);



	if (count > 0) {
		divide_tetrahedron(p1, p1_p2, p1_p3, p1_p4, count - 1);
		divide_tetrahedron(p1_p2, p2, p2_p3, p2_p4, count - 1);
		divide_tetrahedron(p1_p3, p2_p3, p3, p3_p4, count - 1);
		divide_tetrahedron(p1_p4, p2_p4, p3_p4, p4, count - 1);
	} else {



		tetrahedron(p1, p2, p3, p4);
	}
}

function tetrahedron(p1, p2, p3, p4) {
	var fN1 = triangle(p1, p2, p3); // Front face.
	var fN2 = triangle(p1, p4, p2); // Right face.
	var fN3 = triangle(p3, p2, p4); // Left face.
	var fN4 = triangle(p1, p3, p4); // Bottom face.

}

function triangle(p1, p2, p3) {

	vertices.push(p1[0]); vertices.push(p1[1]); vertices.push(p1[2]);
	vertices.push(p2[0]); vertices.push(p2[1]); vertices.push(p2[2]);
	vertices.push(p3[0]); vertices.push(p3[1]); vertices.push(p3[2]);







}




//menger sponge---------------------------------------------------------------

function divide_sponge(x, y, z, edge, count) {

	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			for (var k = 1; k <= 3; k++) {



				var num2 = 0;
				if (i == 2) num2++;
				if (j == 2) num2++;
				if (k == 2) num2++;

				// If there are less than 2 overlaps, then there should be a mengerSponge
				// in the specified area
				if (num2 < 2) {
					// Recurse further if there are more levels
					if (count > 0) {

						divide_sponge((x + i * edge), (y + j * edge), (z + k * edge), (edge / 3), count - 1);


					} else if (count == 0) {
						// Otherwise draw a cube in the specified location
						calc_points(i, j, k, x, y, z, edge);
					}
				}
			}
		}


	}



}

function calc_points(i, j, k, x0, y0, z0, edge) {
	//starting pos
	x = x0 + ((i + 1) * edge);
	y = y0 + ((j + 1) * edge);
	z = z0 + ((k + 1) * edge);


	p1 = [x, y, z + edge];
	p2 = [x, y, z];
	p3 = [x + edge, y, z];
	p4 = [x + edge, y, z + edge];
	p5 = [x, y + edge, z + edge];
	p6 = [x, y + edge, z];
	p7 = [x + edge, y + edge, z];
	p8 = [x + edge, y + edge, z + edge];
	cube(p1, p2, p3, p4, p5, p6, p7, p8);





}
function cube(p1, p2, p3, p4, p5, p6, p7, p8) {
	var fn1 = square(p1, p2, p3, p4);//bottom face
	var fn2 = square(p5, p8, p7, p6);//top face
	var fn3 = square(p1, p4, p8, p5);//front face
	var fn4 = square(p4, p3, p7, p8);//right face
	var fn5 = square(p2, p6, p7, p3);//back face
	var fn6 = square(p1, p5, p6, p2);//left face
}
function square(p1, p2, p3, p4) {
	//first half of the square
	vertices.push(p1[0]); vertices.push(p1[1]); vertices.push(p1[2]);
	vertices.push(p2[0]); vertices.push(p2[1]); vertices.push(p2[2]);
	vertices.push(p3[0]); vertices.push(p3[1]); vertices.push(p3[2]);

	//second half of the square
	vertices.push(p3[0]); vertices.push(p3[1]); vertices.push(p3[2]);
	vertices.push(p4[0]); vertices.push(p4[1]); vertices.push(p4[2]);
	vertices.push(p1[0]); vertices.push(p1[1]); vertices.push(p1[2]);



}






//mandelbuld atempt----------------------------------------------------------------------------
function get_coord() {
	var vertice_array = [];
	var n = 20;

	for (var i = -n; i < n; i++) {
		for (var j = -n; j < n; j++) {
			for (var k = -n; k < n; k++) {
				x = (i * (1 / n)).toFixed(3);
				y = (j * (1 / n)).toFixed(3);
				z = (k * (1 / n)).toFixed(3);



				vertice_array.push(x);
				vertice_array.push(y);
				vertice_array.push(z);

			}
		}
	}

	return vertice_array;
}
function points_generation(x, y, z, n, count) {



	for (var i = 0; i < count; i++) {

		r = Math.sqrt(x * x + y * y + z * z);
		theta = Math.atan2(Math.sqrt(x * x + y * y), z);
		phi = Math.atan2(y, x);

		newx = Math.pow(r, n) * Math.sin(theta * n) * Math.cos(phi * n);
		newy = Math.pow(r, n) * Math.sin(theta * n) * Math.sin(phi * n);
		newz = Math.pow(r, n) * Math.cos(theta * n);

		x = newx;
		y = newy;
		z = newz;


		if (r <= 1) { //condição

			condition_vertices.push(newx);
			condition_vertices.push(newy);
			condition_vertices.push(newz);
			break;


		}

	}






}
//----------------------------------------------------------------------------




function clear_screen() {
	vertices = [];
	initWebGL();
}

function setEventListeners() {

	// Dropdown list

	var list = document.getElementById("rendering-mode-selection");
	var fractal = document.getElementById("fractal-type");
	var iter = document.getElementById("iteraction number");

	var lights = document.getElementById("Color");
	var mode = document.getElementById("mode");

	document.getElementById("light-apply").onclick = function () {
		var color = lights.selectedIndex;
		var lm = mode.selectedIndex;

		switch (color) {
			case 0: //red
				customLight = false;
				lightSources = [];
				lightSources.push(new LightSource());

				lightSources[0].setPosition(0.0, 0.0, 1.0, 0.0);
				lightSources[0].setIntensity(1.0, 0.0, 0.0);
				lightSources[0].setAmbIntensity(0.8, 0.8, 0.8);
				if (lm) {
					lightSources[0].setPosition(0.0, 0.0, 1.0, 0.0);
					lightSources[0].switchRotYYOff();
					lightSources[0].switchRotXXOff();
					
				} else {
					
					lightSources[0].switchRotYYOn();
					lightSources[0].switchRotXXOn();
				}

				break;
			case 1://blue
				customLight = false;
				lightSources = [];
				lightSources.push(new LightSource());

				lightSources[0].setPosition(1.0, 0.5, 0.5, 0.0);
				lightSources[0].setIntensity(0.4, 0.7, 1.0);
				lightSources[0].setAmbIntensity(0.2, 0.0, 0.0);
				if (lm) {
					lightSources[0].setPosition(0.0, 0.0, 1.0, 0.0);
					lightSources[0].switchRotYYOff();
					lightSources[0].switchRotXXOff();

				} else {

					lightSources[0].switchRotYYOn();
					lightSources[0].switchRotXXOn();
				}
				break;
			case 2://green
				lightSources = [];
				lightSources.push(new LightSource());
				customLight = false;
				lightSources[0].setPosition(0.0, -1.0, 1.0, 0.0);
				lightSources[0].setIntensity(0.4, 1.0, 0.3);
				lightSources[0].setAmbIntensity(0.8, 0.0, 0.0);
				if (lm) {
					lightSources[0].setPosition(0.0, 0.0, 1.0, 0.0);
					lightSources[0].switchRotYYOff();
					lightSources[0].switchRotXXOff();

				} else { //static                         

					lightSources[0].switchRotYYOn();
					lightSources[0].switchRotXXOn();
				}
				break;
			case 3:
				lightSources = [];
				customLight = false;
				lightSources.push(new LightSource());
				lightSources.push(new LightSource());


				lightSources[0].setPosition(0.0, 1.0, 1.0, 0.0);
				lightSources[0].setIntensity(0.0, 0.8, 0.9);
				lightSources[0].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[0].switchRotYYOn();
				lightSources[0].switchRotXXOn();

				lightSources[1].setPosition(0.0, -1.0, -1.0, 0.0);
				lightSources[1].setIntensity(0.9, 0.0, 0.8);
				lightSources[1].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[1].switchRotYYOn();
				lightSources[1].switchRotXXOn();
				break;
			case 4:
				lightSources = [];
				customLight = false;
				lightSources.push(new LightSource());
				lightSources.push(new LightSource());
				lightSources.push(new LightSource());




				lightSources[0].setPosition(0.0, 1.0, 1.0, 0.0);
				lightSources[0].setIntensity(0.9, 0.8, 0.3);
				lightSources[0].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[0].switchRotYYOn();
				lightSources[0].switchRotXXOn();

				lightSources[1].setPosition(1.0, 1.0, 0.0, 0.0);
				lightSources[1].setIntensity(0.4, 0.1, 0.2);
				lightSources[1].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[1].switchRotYYOn();
				lightSources[1].switchRotXXOn();


				lightSources[2].setPosition(0.0, -1.0, 0.0, 0.0);
				lightSources[2].setIntensity(0.3, 0.2, 0.9);
				lightSources[2].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[2].switchRotYYOn();
				lightSources[2].switchRotXXOn();
				break;
			case 5:
				lightSources = [];
				customLight = true;
				lightSources.push(new LightSource());
				lightSources.push(new LightSource());
				lightSources.push(new LightSource());




				lightSources[0].setPosition(0.0, -1.0, 0.0, 0.0);
				lightSources[0].setIntensity(0.9, 0.8, 0.3);
				lightSources[0].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[0].switchRotYYOn();
				lightSources[0].switchRotXXOn();

				lightSources[1].setPosition(0.0, 1.0, 0.0, 0.0);
				lightSources[1].setIntensity(1.0, 0.8, 0.7);
				lightSources[1].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[1].switchRotYYOn();
				lightSources[1].switchRotXXOn();


				lightSources[2].setPosition(1.0, 0.0, 0.0, 0.0);
				lightSources[2].setIntensity(1.0, 0.2, 0.3);
				lightSources[2].setAmbIntensity(0.8, 0.0, 0.0);
				lightSources[2].switchRotYYOn();
				lightSources[2].switchRotXXOn();

				lightSources[0].setRotationSpeed(0.3);
				lightSources[1].setRotationSpeed(0.3);
				lightSources[2].setRotationSpeed(0.3);
				break;

		}

	}


	document.getElementById("fractal-apply").onclick = function () {
		var type = fractal.selectedIndex;
		var iter_n = iter.selectedIndex;
		switch (type) {

			case 0://sierpinski pyramid
				clear_screen();
				// Initial model for tetrahedron
				var p1 = [-1.0, 0.0, -0.707,];
				var p2 = [0.0, 1.0, 0.707,];
				var p3 = [1.0, 0.0, -0.707,];
				var p4 = [0.0, -1.0, 0.707,];
				divide_tetrahedron(p1, p2, p3, p4, iter_n);
				computeVertexNormals(vertices, normals);
				initBuffers();
				break;
			case 1://menger sponge
				clear_screen();
				divide_sponge(-2, -2, -2, 0.5, iter_n);
				computeVertexNormals(vertices, normals);
				initWebGL();
				break;
			case 2:
				clear_screen();
				// Initial model for tetrahedron
				var p1 = [-1.0, 0.0, -0.707,];
				var p2 = [0.0, 1.0, 0.707,];
				var p3 = [1.0, 0.0, -0.707,];
				var p4 = [0.0, -1.0, 0.707,];
				KochSnowflake(p1, p2, p3, p4, iter_n);
				computeVertexNormals(vertices, normals);
				initBuffers();
				break;
			case 3:
				clear_screen();
				var v1 = [-1, -1, 1];
				var v2 = [1, -1, 1];
				var v3 = [1, 1, 1];
				var v4 = [-1, 1, 1];
				var v5 = [-1, -1, -1];
				var v6 = [1, -1, -1];
				var v7 = [1, 1, -1];
				var v8 = [-1, 1, -1];
				jerusalemCube(v1, v2, v3, v4, v5, v6, v7, v8, iter_n);
				computeVertexNormals(vertices, normals);
				initWebGL


		}
	};
	list.addEventListener("click", function () {

		// Getting the selection

		var mode = list.selectedIndex;

		switch (mode) {

			case 0: primitiveType = gl.TRIANGLES;
				break;

			case 1: primitiveType = gl.LINE_LOOP;
				break;

			case 2: primitiveType = gl.POINTS;
				break;
		}

	});

	document.getElementById("mandelbulb").onclick = function () {
		clear_screen();
		var tmp = get_coord();
		moveToSphericalSurface
		for (var i = 0; i < tmp.length; i++) {
			points_generation(tmp[0 + i], tmp[1 + i], tmp[2 + i], 8, 30);


		}

		vertices = condition_vertices;


		computeVertexNormals(vertices, normals);
		initBuffers();






	};

	//camera Controlls
	window.onkeydown = function (event) {
		switch (event.keyCode) {
			case 87: // Forward W
				speed = 0.003;

				break;


			case 83: // Backward S
				speed = -0.003;

				break;
			case 65: // Left A
				yawRate = 0.1;

				break;
			case 68: // Right D
				yawRate = -0.1;
				break;
			case 82:
				pitchRate = 0.1;
				break;
			case 70:
				pitchRate = -0.1;
				break;

			case 81:
				move_left = true;
				break;
			case 69:
				move_right = true;
				break;
			case 90:
				move_up = true;
				break;
			case 88:
				move_down = true;
				break;


		}
	};
	window.onkeyup = function (event) {
		switch (event.keyCode) {
			case 87: // Forward W
				speed = 0;

				break;
			case 83: // Backward S
				speed = 0

				break;
			case 65: // Left A
				yawRate = 0;

				break;
			case 68: // Right D
				yawRate = 0;
				break;
			case 82:
				pitchRate = 0;
				break;
			case 70:
				pitchRate = 0;
				break;
			case 81:
				move_left = false;
				break;
			case 69:
				move_right = false;
				break;
			case 90:
				move_up = false;
				break;
			case 88:
				move_down = false;
				break;

		}
	};


	var mouseDown = false;

	var lastMouseX = null;

	var lastMouseY = null;
	window.onmousedown = function (event) {


		mouseDown = true;

		lastMouseX = event.clientX;

		lastMouseY = event.clientY;
	}

	window.onmouseup = function (event) {

		mouseDown = false;
	}

	window.onmousemove = function (event) {

		if (!mouseDown) {

			return;
		}



		// Rotation angles proportional to cursor displacement

		var newX = event.clientX;

		var newY = event.clientY;

		var deltaX = newX - lastMouseX;

		angleYY += radians(10 * deltaX)

		var deltaY = newY - lastMouseY;

		angleXX += radians(10 * deltaY)

		lastMouseX = newX

		lastMouseY = newY;
	}




	document.getElementById("reset-button").onclick = function () {

		// The initial values

		tx = 0;

		ty = 0;

		tz = 0;
		yaw = 90;
		pitch = 0;
		angleXX = 0.0;

		angleYY = 0.0;

		angleZZ = 0.0;

		sx = 0;

		sy = 0

		sz = 0;

		rotationXX_ON = 0;

		rotationXX_DIR = 1;

		rotationXX_SPEED = 1;

		rotationYY_ON = 0;

		rotationYY_DIR = 1;

		rotationYY_SPEED = 1;

		rotationZZ_ON = 0;

		rotationZZ_DIR = 1;

		rotationZZ_SPEED = 1;


		initWebGL();

	};
}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL(canvas) {
	try {

		// Create the WebGL context

		// Some browsers still need "experimental-webgl"

		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

		//----------Full Screen---------------

		//gl.canvas.width  = window.innerWidth;
		//gl.canvas.height = window.innerHeight;
		//gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		//----------/Full Screen---------------

		// DEFAULT: The viewport occupies the whole canvas 

		// DEFAULT: The viewport background color is WHITE

		// NEW - Drawing the triangles defining the model

		primitiveType = gl.TRIANGLES;

		// DEFAULT: Face culling is DISABLED

		// Enable FACE CULLING

		gl.enable(gl.CULL_FACE);

		// DEFAULT: The BACK FACE is culled!!

		// The next instruction is not needed...

		gl.cullFace(gl.BACK);

		// Enable DEPTH-TEST

		gl.enable(gl.DEPTH_TEST);

	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}
}

//----------------------------------------------------------------------------

function runWebGL() {

	var canvas = document.getElementById("my-canvas");

	initWebGL(canvas);

	shaderProgram = initShaders(gl);

	setEventListeners();

	initBuffers();

	tick();		// NEW --- A timer controls the rendering / animation    

	outputInfos();
}


