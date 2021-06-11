#!/bin/bash

cd `dirname $0`

cd ..

# '1: 检查代码中是否包含 @DEBUG 标识符'
if [ "$(git diff --cached --numstat --diff-filter=ACM | wc -l)" -gt 0 ]
then
  FILES=$(grep -in '@DEBUG' --include *.ts --include *.vue $(git diff --cached --name-only --diff-filter=ACM) /dev/null)
  if [ -n "$FILES" ]
  then
    echo '\033[33m待提交代码中存在 @DEBUG 标识符，提交终止'
    echo $FILES
    exit 1
  fi
fi

# '2: 对整个项目进行完整的类型检查'
TS_CHANGED=$(git diff --cached --numstat --diff-filter=ACM | grep -F '.ts' | wc -l)
if [ "$TS_CHANGED" -gt 0 ]
then
  echo '正在检查 TypeScript 类型，请稍候'
  tsc -p . --noEmit || exit 1
fi

# '3: 执行 lint-staged 中定义的其它检查'
#lint-staged

