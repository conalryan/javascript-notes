# Faster HTML and CSS
https://www.youtube.com/watch?v=a2_6bGNZ7bA&gl=IN&hl=en-GB

## Steps
Content Tree -> Compute style -> Construct frames -> Layout -> Paint

## Avoid Re-Layout
- Instead of style.top or position relative/absolute, you can also get the same effect programatically using scrollTop or scrollLeft.
- You can even set the overflow to hidden, so you won't see the scroll, but this tecnique will avoid a full repaint.

## Script & Computed Style
- Browsers tries to batch paints. However, if a script asks for the computed style, before it has been done, the browser needs to flush all the changes to make sure the styles are all up to date and that the layout is up to date.

## Changes
- If you change display property, then browser needs to construct a **new frame** and rerun from 'Construct frames' through paint.
- If you change width property, then browser doesn't need to create a new render frame, but it does need to **adjust layout** and paint.
- If you change the color property, the browser only needs to **paint**.

## Layout
- Relayout is always a recursive proceses running down from the top of the tree. 
- Width are input.
- Height are output.
- Meaning each renderer calculates its width, then calculates width of children all the way down. Then the child calcualtes it's height and tells it parent it height, and that goes all the way back up.

## Hiding
- **Display none** will cause the objects to be **removed from the render tree**, then will need new layout and new paint.
- **Visibility** property will not need new render tree and new layout, it will only need **new paint**.
- Display none has a higher cost on each change, however visibility has a higher initial cost, since the render tree and layout will still need to be done even when it's hidden.