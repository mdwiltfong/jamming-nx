declare namespace NodeJS {
  interface ProcessEnv {
    MY_VARIABLE: string;
    ANOTHER_VARIABLE: string;
    // Add more variable declarations here
  }
}

type MyVariableType = string | number;
