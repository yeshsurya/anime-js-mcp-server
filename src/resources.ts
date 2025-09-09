/**
 * Resources for the Anime.js MCP server
 * 
 * Resources are static or dynamically generated content that can be retrieved by MCP clients.
 * These provide information about available Anime.js components, APIs, and examples.
 */

export const resources = [
  {
    uri: "resource:get_anime_components",
    name: "Available Anime.js Components and APIs",
    description: "List of all available Anime.js components, properties, and APIs",
    mimeType: "text/plain"
  }
];

export const resourceHandlers = {
  "resource:get_anime_components": () => ({
    contentType: "text/plain",
    content: `# Anime.js Components and APIs

## Core Animation Functions
- anime() - Main animation function
- anime.timeline() - Timeline for sequencing animations
- anime.stagger() - Stagger animations across multiple elements

## Animation Properties
- translateX, translateY, translateZ - Translation transforms
- rotateX, rotateY, rotateZ, rotate - Rotation transforms  
- scaleX, scaleY, scale - Scale transforms
- skewX, skewY - Skew transforms
- opacity - Opacity changes
- backgroundColor - Background color animations
- color - Text color animations
- width, height - Dimension animations
- borderRadius - Border radius animations
- left, top - Position animations

## Easing Functions
- easeInQuad, easeOutQuad, easeInOutQuad
- easeInCubic, easeOutCubic, easeInOutCubic
- easeInQuart, easeOutQuart, easeInOutQuart
- easeInQuint, easeOutQuint, easeInOutQuint
- easeInSine, easeOutSine, easeInOutSine
- easeInExpo, easeOutExpo, easeInOutExpo
- easeInCirc, easeOutCirc, easeInOutCirc
- easeInBack, easeOutBack, easeInOutBack
- easeInElastic, easeOutElastic, easeInOutElastic
- easeInBounce, easeOutBounce, easeInOutBounce

## Animation Controls
- play() - Play animation
- pause() - Pause animation
- restart() - Restart animation
- reverse() - Reverse animation direction
- seek() - Seek to specific time
- finished - Promise that resolves when animation completes

## Callbacks
- update - Called on each frame
- begin - Called when animation begins
- complete - Called when animation completes
- loopBegin - Called at loop start
- loopComplete - Called at loop end
- change - Called when values change
- changeBegin - Called when change begins
- changeComplete - Called when change completes

## Utility Functions
- anime.remove() - Remove animations from elements
- anime.get() - Get animation instances
- anime.set() - Set CSS properties without animation
- anime.random() - Generate random values
- anime.path() - SVG path animations
- anime.setLogLevel() - Set logging level
- anime.version - Get Anime.js version
`
  })
};