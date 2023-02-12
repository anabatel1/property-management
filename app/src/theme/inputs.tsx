import { css } from 'styled-components';

export const InputStyle = (colors) => css`
    :root {
        --text-decoration-color: ${colors.gray400};
        --text-color: ${colors.superPastelGreen};
        --focus-ring: 0 0 0 0.2rem ${colors.green500};
        --focus-ring-color: ${colors.green500};
        --primary-color:${colors.green500};
    }

    /* Form ––––––––––––––––––––––––––––––––– */
    label {
        font-weight: bold;
        display: flex;
    }

    input[type="email"],
    input[type="text"],
    input[type="password"],
    input[type="number"] {
        padding: 0.65rem 0.5rem;
        font-size: 1rem;
        border: 2px solid ${colors.gray200};
        background-color: ${colors.gray100};
        color: ${colors.superPastelGreen};
        border-radius: 10px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    select {
        margin: 0;
        -webkit-appearance: none;
        box-sizing: border-box;
        padding: 0.65rem 0.5rem;
        font-size: 1rem;
        border: 2px solid ${colors.gray200};
        border-radius: 10px;
        color: ${colors.gray700};
        height: auto;
        background-color: ${colors.gray100};
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.304 125.304"><path d="M62.652 103.895L0 21.41h125.304" fill="%23343334"/></svg>');
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: center right 0.5rem;
    }

    textarea {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font-size: 1rem;
        border: 2px solid ${colors.gray200};
        color: ${colors.gray700};
        border-radius: 10px;
        resize: vertical;
        background-color: ${colors.gray100};
        box-sizing: border-box;
        padding: 0.65rem 0.5rem;
    }

    input:focus,
    select:focus,
    textarea:focus {
        outline: none;
        border: 2px solid ${colors.green500};
    }

    input:invalid,
    select:invalid,
    textarea:invalid {
        border: 2px solid #ff7d87;
        box-shadow: none;
    }

    input[type="checkbox"] {
        display: inline-block;
        height: 1rem;
        font-size: 1rem;
        border-radius: 5px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 2px solid ${colors.gray300};
        width: 1rem;
        background-color: white;
        align-self: center;
        margin-right: 0.5rem;
    }

    input[type="checkbox"]:hover {
        cursor: pointer;
    }

    input[type="checkbox"]:checked {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="78.369" height="78.369" viewBox="0 0 78.369 78.369"><path fill="white" d="M78.05 19.015l-48.592 48.59c-.428.43-1.12.43-1.548 0L.32 40.016c-.427-.426-.427-1.12 0-1.547l6.704-6.704c.428-.427 1.12-.427 1.548 0l20.113 20.112 41.113-41.113c.43-.427 1.12-.427 1.548 0l6.703 6.704c.427.427.427 1.12 0 1.548z"/></svg>');
        background-size: contain;
        background-color: ${colors.green500};
        border: 2px solid ${colors.green500};
    }

    input[type="checkbox"]:focus-visible,
    input[type="checkbox"]:checked:focus-visible {
        border-color: ${colors.green500};
    }

    input[type="radio"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 50%;
        border: 2px solid ${colors.gray300};
        height: 1rem;
        width: 1rem;
        margin-right: 0.5rem;
        align-self: center;
        justify-content: center;
        position: relative;
        display: flex;
    }

    @media (hover: hover) {
        input[type="radio"]:hover {
            cursor: pointer;
        }
    }

    input[type="radio"]:checked {
        border: 2px solid ${colors.gray700};
    }

    input[type="radio"]:focus-visible,
    input[type="radio"]:checked:focus-visible {
        border-color: ${colors.green500};
    }

    input[type="radio"]:checked::before {
        content: "";
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background-color: ${colors.gray700};
        align-self: center;
        border-radius: 50%;
    }

    input[type="submit"],
    input[type="reset"],
    input[type="button"],
    button {
        padding: 0.5rem 1.25rem;
        font-size: 1rem;
        border-radius: 10px;
        background-color: ${colors.gray700};
        border: 2px solid ${colors.gray700};
        color: white;
        text-decoration: none;
        font-weight: bold;
        margin-bottom: 1rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: inline-block;
        line-height: initial;
        transition: background-color 200ms ease-in-out, border 200ms ease-in-out,
            transform 200ms ease-in-out;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }

    @media (hover: hover) {
        input[type="submit"]:hover,
        input[type="reset"]:hover,
        input[type="button"]:hover,
        button:hover {
            cursor: pointer;
            background-color: ${colors.superPastelGreen};
        }
    }

    button:focus-visible,
    input[type="submit"]:focus-visible,
    input[type="reset"]:focus-visible,
    input[type="button"]:focus-visible {
        border-color: ${colors.green500};
        outline: none;
    }

    .error {
        font-size: 12px;
        color: ${colors.red600};
        margin-top: 0.25rem;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed !important;
    }

    button + button {
        margin-left: 0.5rem;
    }

    button.secondary,
    button[type="reset"] {
        background-color: ${colors.gray300};
        border: 2px solid ${colors.gray300};
        color: ${colors.gray900};
    }

    button.secondary:hover,
    button[type="reset"]:hover {
        background-color: ${colors.gray400};
    }

    // Override primefaces css because the free version doesn't allow for custom css
    .p-inputtext,
    input {
        &:enabled:hover {
            border-color: ${colors.green500};
        }
        &:enabled:focus {
            outline: 0 none;
            outline-offset: 0;
            box-shadow: none;
            border-color: ${colors.green500};
        }
        &.p-invalid.p-component {
            border-color: ${colors.red600};;
        }
    }
`;