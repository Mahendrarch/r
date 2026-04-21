// TODO: Replace with optimized fragment shader
// Placeholder for data crystal fragment shading

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uTime;

void main() {
  // Base color with subtle animation
  vec3 color = uColor;
  
  // Add scanline effect
  float scanline = sin(vPosition.y * 20.0 + uTime) * 0.1;
  color += scanline;
  
  // Fresnel-like edge glow
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = dot(viewDirection, vNormal);
  color *= (1.0 - fresnel) * 0.5 + 0.5;
  
  gl_FragColor = vec4(color, 0.8);
}
