import { testMapper } from "polygon/testMapper";

export class CodeGenerator {
    private readonly testMapper = testMapper;

    public generateTestingCode(lodashFnName: string): string {
        const str = `
    function test(testCases) { 
      const result = [];
      for (const testCase of testCases) { 
        try {
          equal(
            ${lodashFnName}(...testCase.input),
            testCase.expected
          ); 
          result.push(true);
					} catch (e) {
          result.push(serializeError(e));  
				}
      }
      return result;  
		}`;

        return str;
    }

    public generateDefaultCode(lodashFnName: string) {
        const jsdoc = this.generateJSDOC(lodashFnName);
        const fn = this.generateDefaultFunction(lodashFnName);
        return { generatedCode: jsdoc + "\n" + fn };
    }

    private generateJSDOC(lodashFnName: string): string {
        console.log("MAP OBJECT: ", this.testMapper.get(lodashFnName));
        const testObj = this.testMapper.get(lodashFnName);
        const args = testObj.arguments;
        const returnType = testObj.returnType;

        let jsDocFn = "/**\n";

        for (const testCase of args) {
            jsDocFn += `  * @param {${testCase.type}} ${testCase.name}\n`;
        }

        jsDocFn += `  * @returns {${returnType}}\n  */`;

        return jsDocFn;
    }

    private generateDefaultFunction(lodashFnName: string) {
        const args = this.testMapper
            .get(lodashFnName)
            .arguments.map((obj) => obj.name)
            .join(", ");
        const fnStr = `function ${lodashFnName}(${args}) {}`;

        return fnStr;
    }
}
