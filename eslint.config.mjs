import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
), {
    plugins: {
        react,
        "react-hooks": fixupPluginRules(reactHooks),
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.jest,
            ...globals.node,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "@typescript-eslint/member-ordering": ["error"],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",

        "array-bracket-spacing": ["error", "always", {
            arraysInArrays: true,
            objectsInArrays: true,
        }],

        "comma-dangle": ["error", "always-multiline"],

        "comma-spacing": ["error", {
            after: true,
            before: false,
        }],

        "comma-style": ["error", "last"],

        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        "key-spacing": ["error", {
            beforeColon: false,
        }],

        "linebreak-style": ["error", "unix"],
        "no-empty-function": "error",
        "no-multi-spaces": "error",

        "object-curly-spacing": ["error", "always", {
            objectsInObjects: false,
        }],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        "react/display-name": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        semi: ["error", "always"],

        "semi-spacing": ["error", {
            after: true,
            before: true,
        }],

        "sort-imports": ["error", {
            allowSeparatedGroups: true,
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        }],

        "sort-keys": ["error", "asc", {
            caseSensitive: true,
            minKeys: 2,
            natural: false,
        }],
    },
}];