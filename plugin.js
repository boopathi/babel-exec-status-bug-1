module.exports = function(babel) {
  const { types: t } = babel;

  return {
    name: "bug",

    visitor: {
      ReferencedIdentifier(path) {
        const binding = path.scope.getBinding(path.node.name);

        if (!binding) return;

        const execStatus = binding.path._guessExecutionStatusRelativeTo(path);

        if (execStatus === "before") {
          const evalResult = path.evaluate();

          if (evalResult.confident) {
            path.replaceWith(t.valueToNode(evalResult.value));
          }
        } else if (execStatus === "after") {
          //
          // This happens when `block scoped vars` are converted to vars
          // i.e. the execStatus computes to `after` even though it actually is `before`
          //
          path.replaceWith(t.valueToNode(undefined));
        }
      }
    }
  };
};
