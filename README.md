# Chess Game

# Features
- Select game type (bullet, rapid, blitz).
- Chess game starts after first move.
- Chess game ends after one player wins, resigns or both draw.
- Each player has a timer



The **Player component** in the chess game displays the player's name, which can be edited dynamically, along with their color (white or black) and remaining game time. Utilizing useState for name and edit status, useRef for input focus, and useEffect for timely focus management, it offers an interactive experience for editing names. Additionally, the component shows the player's color through an icon and includes a timer display