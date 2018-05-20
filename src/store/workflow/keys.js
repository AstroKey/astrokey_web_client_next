
// Key JSON definitions
// TODO - abstract ROW attributes from this DS
export const KEYS = [
    { row: 'r4', key: '`', shift_key: '~', keycode: 192, dec: 53 },
    { row: 'r4', key: '1', shift_key: '!', keycode: 49, dec: 30 },
    { row: 'r4', key: '2', shift_key: '@', keycode: 50, dec: 31 },
    { row: 'r4', key: '3', shift_key: '#', keycode: 51, dec: 32 },
    { row: 'r4', key: '4', shift_key: '$', keycode: 52, dec: 33 },
    { row: 'r4', key: '5', shift_key: '%', keycode: 53, dec: 34 },
    { row: 'r4', key: '6', shift_key: '^', keycode: 54, dec: 35 },
    { row: 'r4', key: '7', shift_key: '&', keycode: 55, dec: 36 },
    { row: 'r4', key: '8', shift_key: '*', keycode: 56, dec: 37 },
    { row: 'r4', key: '9', shift_key: '(', keycode: 57, dec: 38 },
    { row: 'r4', key: '0', shift_key: ')', keycode: 48, dec: 39 },
    { row: 'r4', key: '-', shift_key: '_', keycode: 189, dec: 45 },
    { row: 'r4', key: '=', shift_key: '+', keycode: 187, dec: 46 },
    { row: 'r4', key: 'BACKSPACE', keycode: 8, css: 'w2_0', dec: 42 },

    { row: 'r3', key: 'TAB', keycode: 9, css: 'w1_5', special: true, dec: 43 },
    { row: 'r3', key: 'q', shift_key: 'Q', alpha: true, keycode: 81, dec: 20 },
    { row: 'r3', key: 'w', shift_key: 'W', alpha: true, keycode: 87, dec: 26 },
    { row: 'r3', key: 'e', shift_key: 'E', alpha: true, keycode: 69, dec: 8 },
    { row: 'r3', key: 'r', shift_key: 'R', alpha: true, keycode: 82, dec: 21 },
    { row: 'r3', key: 't', shift_key: 'T', alpha: true, keycode: 84, dec: 23 },
    { row: 'r3', key: 'y', shift_key: 'Y', alpha: true, keycode: 89, dec: 28 },
    { row: 'r3', key: 'u', shift_key: 'U', alpha: true, keycode: 85, dec: 24 },
    { row: 'r3', key: 'i', shift_key: 'I', alpha: true, keycode: 73, dec: 12 },
    { row: 'r3', key: 'o', shift_key: 'O', alpha: true, keycode: 79, dec: 18 },
    { row: 'r3', key: 'p', shift_key: 'P', alpha: true, keycode: 80, dec: 19 },
    { row: 'r3', key: '[', shift_key: '{', keycode: 219, dec: 47 },
    { row: 'r3', key: ']', shift_key: '}', keycode: 221, dec: 48 },
    { row: 'r3', key: '\\', shift_key: '|', keycode: 220, css: 'w1_5', dec: 49 },

    { row: 'r2', key: 'CAPS', css: 'w1_75', keycode: 20, special: true, dec: 57 },
    { row: 'r2', key: 'a', shift_key: 'A', alpha: true, keycode: 65, dec: 4 },
    { row: 'r2', key: 's', shift_key: 'S', alpha: true, keycode: 83, dec: 22 },
    { row: 'r2', key: 'd', shift_key: 'D', alpha: true, keycode: 68, dec: 7 },
    { row: 'r2', key: 'f', shift_key: 'F', alpha: true, keycode: 70, dec: 9 },
    { row: 'r2', key: 'g', shift_key: 'G', alpha: true, keycode: 71, dec: 10 },
    { row: 'r2', key: 'h', shift_key: 'H', alpha: true, keycode: 72, dec: 11 },
    { row: 'r2', key: 'j', shift_key: 'J', alpha: true, keycode: 74, dec: 13 },
    { row: 'r2', key: 'k', shift_key: 'K', alpha: true, keycode: 75, dec: 14 },
    { row: 'r2', key: 'l', shift_key: 'L', alpha: true, keycode: 76, dec: 15 },
    { row: 'r2', key: ';', shift_key: ':', keycode: 186, dec: 51 },
    { row: 'r2', key: "'", shift_key: '"', keycode: 222, dec: 52 },
    { row: 'r2', key: 'RETURN', css: 'w2_25', keycode: 13, special: true, dec: 88 }, // ENTER == { dec: 40 }

    { row: 'r1', key: 'SHIFT', css: 'w2_25', keycode: 16, isModifier: true, special: true, dec: 225 },
    { row: 'r1', key: 'z', shift_key: 'Z', alpha: true, keycode: 90, dec: 29 },
    { row: 'r1', key: 'x', shift_key: 'X', alpha: true, keycode: 88, dec: 27 },
    { row: 'r1', key: 'c', shift_key: 'C', alpha: true, keycode: 67, dec: 6 },
    { row: 'r1', key: 'v', shift_key: 'V', alpha: true, keycode: 86, dec: 25 },
    { row: 'r1', key: 'b', shift_key: 'B', alpha: true, keycode: 66, dec: 5 },
    { row: 'r1', key: 'n', shift_key: 'N', alpha: true, keycode: 78, dec: 17 },
    { row: 'r1', key: 'm', shift_key: 'M', alpha: true, keycode: 77, dec: 16 },
    { row: 'r1', key: ',', shift_key: '<', keycode: 188, dec: 54 },
    { row: 'r1', key: '.', shift_key: '>', keycode: 190, dec: 55 },
    { row: 'r1', key: '/', shift_key: '?', keycode: 191, dec: 56 },
    { row: 'r1', key: 'SHIFT', css: 'w2_75', keycode: 16, isModifier: true, special: true, dec: 225 },

    { row: 'r0', key: 'CTRL', css: 'w1_25', keycode: 17, isModifier: true, special: true, dec: 224 },
    { row: 'r0', key: 'META', css: 'w1_25', keycode: 91, isModifier: true, special: true, dec: 227 },
    { row: 'r0', key: 'ALT', css: 'w1_25', keycode: 18, isModifier: true, special: true, dec: 226 },
    { row: 'r0', key: 'SPACE', css: 'space', keycode: 32, special: true, dec: 44 },
    { row: 'r0', key: 'CTRL', css: 'w1_25', keycode: 17, isModifier: true, special: true, dec: 224 },
    { row: 'r0', key: 'META', css: 'w1_25', keycode: 91, isModifier: true, special: true, dec: 227 },
    { row: 'r0', key: 'P', css: 'w1_25', keycode: 93, isModifier: true, special: true, dec: 70 },
    { row: 'r0', key: 'ALT', css: 'w1_25', keycode: 18, isModifier: true, special: true, dec: 226 },

    // NUMPAD
    { row: 'num_r4', key: 'n_CLEAR', keycode: 6083, dec: 83 },
    { row: 'num_r4', key: 'n_/', keycode: 6084, dec: 84 },
    { row: 'num_r4', key: 'n_*', keycode: 6085, dec: 85 },

    { row: 'num_col', key: 'n_-', keycode: 6086, dec: 86 },
    { row: 'num_col', key: 'n_+', keycode: 6087, css: 'h2_0', dec: 87 },
    { row: 'num_col', key: 'n_ENTER', keycode: 6088, css: 'h2_0', dec: 88 },

    { row: 'num_r1', key: 'n_1', keycode: 6089, dec: 89 },
    { row: 'num_r1', key: 'n_2', keycode: 6090, dec: 90 },
    { row: 'num_r1', key: 'n_3', keycode: 6091, dec: 91 },

    { row: 'num_r2', key: 'n_4', keycode: 6092, dec: 92 },
    { row: 'num_r2', key: 'n_5', keycode: 6093, dec: 93 },
    { row: 'num_r2', key: 'n_6', keycode: 6094, dec: 94 },

    { row: 'num_r3', key: 'n_7', keycode: 6095, dec: 95 },
    { row: 'num_r3', key: 'n_8', keycode: 6096, dec: 96 },
    { row: 'num_r3', key: 'n_9', keycode: 6097, dec: 97 },

    { row: 'num_r0', key: 'n_0', keycode: 6098, dec: 98 },
    { row: 'num_r0', key: 'n_.', keycode: 6099, dec: 99 },

    // Function Keys (F1 - F12)
    { row: 'func_r0', key: 'F1', keycode: 2000, dec: 58 },
    { row: 'func_r0', key: 'F2', keycode: 2001, dec: 59 },
    { row: 'func_r0', key: 'F3', keycode: 2002, dec: 60 },
    { row: 'func_r0', key: 'F4', keycode: 2003, dec: 61 },
    { row: 'func_r0', key: 'F5', keycode: 2004, dec: 62 },
    { row: 'func_r0', key: 'F6', keycode: 2005, dec: 63 },
    { row: 'func_r0', key: 'F7', keycode: 2006, dec: 64 },
    { row: 'func_r0', key: 'F8', keycode: 2007, dec: 65 },
    { row: 'func_r0', key: 'F9', keycode: 2008, dec: 66 },
    { row: 'func_r0', key: 'F10', keycode: 2009, dec: 67 },
    { row: 'func_r0', key: 'F11', keycode: 2010, dec: 68 },
    { row: 'func_r0', key: 'F12', keycode: 2011, dec: 69 },

    // Function Keys (F13-F24)
    // { row: 'func_r0', key: 'F13', keycode: 2104, dec: 104 }
    // { row: 'func_r0', key: 'F14', keycode: 2105, dec: 105 }
    // { row: 'func_r0', key: 'F15', keycode: 2106, dec: 106 }
    // { row: 'func_r0', key: 'F16', keycode: 2107, dec: 107 }
    // { row: 'func_r0', key: 'F17', keycode: 2108, dec: 108 }
    // { row: 'func_r0', key: 'F18', keycode: 2109, dec: 109 }
    // { row: 'func_r0', key: 'F19', keycode: 2110, dec: 110 }
    // { row: 'func_r0', key: 'F20', keycode: 2111, dec: 111 }
    // { row: 'func_r0', key: 'F21', keycode: 2112, dec: 112 }
    // { row: 'func_r0', key: 'F22', keycode: 2113, dec: 113 }
    // { row: 'func_r0', key: 'F23', keycode: 2114, dec: 114 }
    // { row: 'func_r0', key: 'F24', keycode: 2115, dec: 115 }

    // Media Keys
    // { row: 'media_r0', key: 'F13', keycode: 57, icon: 'fa-step-backward' }
    // { row: 'media_r0', key: 'F13', keycode: 57, icon: 'fa-play' }
    // { row: 'media_r0', key: 'F13', keycode: 57, icon: 'fa-step-forward' }
    { row: 'media_r0', key: 'MUTE', keycode: 5127, icon: 'fa-volume-off', dec: 127 },
    { row: 'media_r0', key: 'VOLUME_UP', keycode: 5129, icon: 'fa-volume-up', dec: 128 },
    { row: 'media_r0', key: 'VOLUME_DN', keycode: 5128, icon: 'fa-volume-down', dec: 129 },

    // Navigation Keys
    { row: 'nav_r0', key: 'PGUP', keycode: 4075, dec: 75 },
    { row: 'nav_r0', key: 'PGDN', keycode: 4078, dec: 78 },
    { row: 'nav_r0', key: 'END', keycode: 4077, dec: 77 },
    { row: 'nav_r0', key: 'HOME', keycode: 4074, dec: 74 },
    { row: 'nav_r0', key: 'LEFT-ARROW', keycode: 4080, icon: 'fa-chevron-left', dec: 80 },
    { row: 'nav_r0', key: 'UP-ARROW', keycode: 4082, icon: 'fa-chevron-up', dec: 82 },
    { row: 'nav_r0', key: 'DOWN-ARROW', keycode: 4081, icon: 'fa-chevron-down', dec: 81 },
    { row: 'nav_r0', key: 'RIGHT-ARROW', keycode: 4079, icon: 'fa-chevron-right', dec: 79 },
    { row: 'nav_r0', key: 'INS', keycode: 4073, dec: 73 },
    { row: 'nav_r0', key: 'DEL', keycode: 4076, dec: 76 },

    // SPECIAL / MISC
    { row: 'special_r0', key: 'DELAY', keycode: 1008, delay: true, position: 3 },
    { row: 'special_r0', key: 'KEY_UP', icon: 'fa-arrow-up', keycode: 1009, key_up: true, position: 3 }
    // { row: 'special_r0', key: 'CUT', keycode: 1000 }
    // { row: 'special_r0', key: 'COPY', keycode: 1001 }
    // { row: 'special_r0', key: 'PASTE', keycode: 1002 }
    // { row: 'special_r0', key: 'DELAY', keycode: 1004 }
    // { row: 'special_r0', key: 'MENU', keycode: 1005 }
    // { row: 'special_r0', key: 'KEYPAD_HEX', keycode: 1006 }

]
