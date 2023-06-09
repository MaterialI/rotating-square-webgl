// Global variables
var canvas;
var gl;
var program;
var theta = 0.0;
var dTheta = 0.01;
var vBuffer;



// Four Vertices
var vertices = [
  vec2(-0.5, -0.5),
  vec2(-0.5, 0.5),
  vec2(0.5, 0.5),
  vec2(-0.5, -0.5),
  vec2(0.5, 0.5),
  vec2(0.5, -0.5),
];

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //  Load shaders and initialize attribute buffers
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Creating the vertex buffer
  vBuffer = gl.createBuffer();

  // Binding the vertex buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate our shader variables with our data buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation(program, "theta");

  render();
};

function render() {
 //changing the speed of the rotation

  theta = theta - dTheta;

  // For debugging

  document.getElementById("debug").innerHTML = theta;
  theta += 0.01;
  // Sending the height to the vertex shader
  gl.uniform1f(thetaLoc, theta);

  // Clearing the buffer and drawing the square
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  window.requestAnimFrame(render);
}
