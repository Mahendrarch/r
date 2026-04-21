// TODO: Replace with optimized vertex shader
// Placeholder for data crystal vertex animation

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;
uniform float uHover;

void main() {
  vUv = uv;
  vNormal = normal;
  
  // Subtle vertex displacement based on time
  vec3 newPosition = position;
  newPosition += normal * sin(uv.x * 10.0 + uTime) * 0.1 * uHover;
  
  vPosition = newPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
