/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

precision mediump float;

// Uniforms passed in from CSS

uniform vec4 backColor;
uniform float useColoredBack;

// Varyings

varying float v_lighting;

// Main.

void main()
{
    if (!gl_FrontFacing && useColoredBack >= 0.5)
        css_MixColor = backColor;

    css_MixColor *= vec4(vec3(v_lighting), 1.0);
}
