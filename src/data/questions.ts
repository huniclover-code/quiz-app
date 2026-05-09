export type Category = 'java' | 'python' | 'linux' | 'sql';

export type Question = {
  id: string;
  category: Category;
  question: string;
  code?: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const questions: Question[] = [
  // ─── JAVA (10문제) ───────────────────────────────────────────────
  {
    id: 'java_001',
    category: 'java',
    question: '다음 코드의 출력 결과로 올바른 것은?',
    code: `class Animal {
  String sound() { return "..."; }
}
class Dog extends Animal {
  @Override
  String sound() { return "Woof"; }
}
public class Main {
  public static void main(String[] args) {
    Animal a = new Dog();
    System.out.println(a.sound());
  }
}`,
    options: ['...', 'Woof', '컴파일 오류', 'null'],
    answer: 1,
    explanation: '업캐스팅(Animal a = new Dog())을 사용해도 실제 객체 타입(Dog)의 오버라이딩된 메서드가 호출됩니다. 이를 동적 바인딩(다형성)이라고 합니다.',
  },
  {
    id: 'java_002',
    category: 'java',
    question: '다음 중 접근 제어자의 접근 범위가 넓은 순서로 올바르게 나열된 것은?',
    options: [
      'public > protected > default > private',
      'public > default > protected > private',
      'protected > public > default > private',
      'public > private > protected > default',
    ],
    answer: 0,
    explanation: 'public(모든 클래스) > protected(같은 패키지 + 자식 클래스) > default(같은 패키지) > private(같은 클래스) 순서로 접근 범위가 좁아집니다.',
  },
  {
    id: 'java_003',
    category: 'java',
    question: '다음 코드에서 컴파일 오류가 발생하는 줄은?',
    code: `List<Integer> list = new ArrayList<>(); // (1)
list.add(10);                              // (2)
list.add("hello");                         // (3)
int val = list.get(0);                     // (4)`,
    options: ['(1)', '(2)', '(3)', '(4)'],
    answer: 2,
    explanation: 'List<Integer>로 선언된 컬렉션에 String 타입을 add하면 제네릭 타입 불일치로 컴파일 오류가 발생합니다.',
  },
  {
    id: 'java_004',
    category: 'java',
    question: '다음 코드의 실행 결과로 올바른 것은?',
    code: `try {
  int[] arr = new int[3];
  arr[5] = 10;
  System.out.println("A");
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.println("B");
} finally {
  System.out.println("C");
}`,
    options: ['A', 'B', 'A C', 'B C'],
    answer: 3,
    explanation: 'arr[5]에서 ArrayIndexOutOfBoundsException이 발생하여 catch 블록("B")이 실행되고, finally 블록("C")은 항상 실행됩니다.',
  },
  {
    id: 'java_005',
    category: 'java',
    question: 'Java에서 인터페이스(interface)에 대한 설명으로 틀린 것은?',
    options: [
      '인터페이스의 모든 필드는 public static final이다',
      '인터페이스는 다중 구현(implements)이 가능하다',
      '인터페이스는 인스턴스를 직접 생성할 수 없다',
      '인터페이스의 메서드는 반드시 abstract여야 한다',
    ],
    answer: 3,
    explanation: 'Java 8부터 인터페이스에 default 메서드와 static 메서드를 정의할 수 있습니다. 따라서 모든 메서드가 abstract일 필요는 없습니다.',
  },
  {
    id: 'java_006',
    category: 'java',
    question: '다음 코드의 출력 결과는?',
    code: `abstract class Shape {
  abstract double area();
  void print() {
    System.out.println("Area: " + area());
  }
}
class Circle extends Shape {
  double r;
  Circle(double r) { this.r = r; }
  @Override
  double area() { return 3.14 * r * r; }
}
// main: new Circle(5).print();`,
    options: ['Area: 78.5', 'Area: 0.0', '컴파일 오류', 'Area: 31.4'],
    answer: 0,
    explanation: '추상 클래스의 print() 메서드 안에서 area()를 호출하면 실제 구현 클래스(Circle)의 area()가 호출됩니다. 3.14 × 5 × 5 = 78.5',
  },
  {
    id: 'java_007',
    category: 'java',
    question: 'Java의 String 클래스에 대한 설명으로 올바른 것은?',
    options: [
      'String 객체는 내용을 변경할 수 있다(mutable)',
      '"==" 연산자로 두 String의 내용을 비교할 수 있다',
      'String은 char 배열을 내부적으로 사용하며 불변(immutable)이다',
      'String은 기본 자료형(primitive type)이다',
    ],
    answer: 2,
    explanation: 'String은 불변(immutable) 객체로 내부적으로 char 배열을 사용합니다. 내용 비교는 equals()를 사용해야 하며, ==은 참조를 비교합니다.',
  },
  {
    id: 'java_008',
    category: 'java',
    question: '다음 제네릭 메서드의 선언으로 올바른 것은?',
    code: `// T 타입 배열에서 최댓값을 반환하는 메서드`,
    options: [
      'public T max(T[] arr)',
      'public <T extends Comparable<T>> T max(T[] arr)',
      'public generic T max(T[] arr)',
      'public T<Comparable> max(T[] arr)',
    ],
    answer: 1,
    explanation: '제네릭 메서드는 반환 타입 앞에 <T>를 선언합니다. 비교가 필요할 경우 <T extends Comparable<T>>처럼 상한 경계를 지정합니다.',
  },
  {
    id: 'java_009',
    category: 'java',
    question: '다음 람다 표현식과 동일한 기능을 하는 코드는?',
    code: `List<String> list = Arrays.asList("C", "A", "B");
list.sort((a, b) -> a.compareTo(b));`,
    options: [
      'list.sort(String::compareTo)',
      'list.sort(Comparator.reverseOrder())',
      'list.sort(null)',
      'Collections.sort(list, (a, b) -> b.compareTo(a))',
    ],
    answer: 0,
    explanation: '(a, b) -> a.compareTo(b)는 메서드 참조 String::compareTo로 표현할 수 있습니다. 두 표현식 모두 오름차순 정렬을 수행합니다.',
  },
  {
    id: 'java_010',
    category: 'java',
    question: 'Java 스레드를 생성하는 방법으로 틀린 것은?',
    options: [
      'Thread 클래스를 상속받아 run() 메서드를 오버라이딩한다',
      'Runnable 인터페이스를 구현하고 Thread 생성자에 전달한다',
      'Callable 인터페이스를 구현하고 ExecutorService로 실행한다',
      'Serializable 인터페이스를 구현하여 스레드를 생성한다',
    ],
    answer: 3,
    explanation: 'Serializable은 객체 직렬화를 위한 인터페이스이며 스레드 생성과 무관합니다. 스레드는 Thread 상속, Runnable 구현, 또는 Callable을 통해 생성합니다.',
  },

  // ─── PYTHON (10문제) ─────────────────────────────────────────────
  {
    id: 'python_001',
    category: 'python',
    question: '다음 코드의 출력 결과는?',
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', '오류 발생'],
    answer: 1,
    explanation: 'Python에서 y = x는 복사가 아니라 같은 리스트 객체를 참조합니다. y.append(4)는 x와 y가 가리키는 동일한 리스트를 수정합니다.',
  },
  {
    id: 'python_002',
    category: 'python',
    question: '다음 딕셔너리 코드의 출력 결과는?',
    code: `d = {'a': 1, 'b': 2, 'c': 3}
print(d.get('d', 0))`,
    options: ['None', 'KeyError', '0', "'d'"],
    answer: 2,
    explanation: 'dict.get(key, default)는 키가 없을 때 default 값을 반환합니다. 키 "d"가 없으므로 두 번째 인자인 0이 반환됩니다.',
  },
  {
    id: 'python_003',
    category: 'python',
    question: '다음 함수의 출력 결과는?',
    code: `def func(a, b=10, *args):
    print(a, b, args)

func(1, 2, 3, 4)`,
    options: ['1 10 (3, 4)', '1 2 (3, 4)', '1 2 3 4', '오류 발생'],
    answer: 1,
    explanation: 'a=1, b=2(기본값 10 대신 전달된 2), *args=(3, 4)가 됩니다. *args는 가변 인자로 나머지 값들을 튜플로 수집합니다.',
  },
  {
    id: 'python_004',
    category: 'python',
    question: '다음 클래스 코드의 출력 결과는?',
    code: `class Counter:
    count = 0
    def __init__(self):
        Counter.count += 1

a = Counter()
b = Counter()
print(Counter.count)`,
    options: ['0', '1', '2', '오류 발생'],
    answer: 2,
    explanation: 'count는 클래스 변수이므로 모든 인스턴스가 공유합니다. 인스턴스가 2개 생성되었으므로 Counter.count는 2가 됩니다.',
  },
  {
    id: 'python_005',
    category: 'python',
    question: '다음 중 리스트 컴프리헨션으로 올바른 것은?',
    code: `# 1~10 중 짝수만 골라 제곱한 리스트`,
    options: [
      '[x**2 for x in range(1,11) if x%2==0]',
      '[x**2 if x%2==0 for x in range(1,11)]',
      '{x**2 for x in range(1,11) if x%2==0}',
      '(x**2 for x in range(1,11) if x%2==0)',
    ],
    answer: 0,
    explanation: '리스트 컴프리헨션 문법은 [표현식 for 변수 in 반복가능 if 조건] 입니다. if는 for 뒤에 위치해야 합니다.',
  },
  {
    id: 'python_006',
    category: 'python',
    question: '다음 코드에서 파일을 안전하게 읽는 방법으로 올바른 것은?',
    code: `# 파일을 열고, 예외가 발생해도 반드시 닫아야 함`,
    options: [
      `f = open('data.txt'); data = f.read(); f.close()`,
      `with open('data.txt', 'r') as f:\n    data = f.read()`,
      `f = open('data.txt'); try: data = f.read()`,
      `data = read('data.txt')`,
    ],
    answer: 1,
    explanation: 'with 문을 사용하면 블록을 벗어날 때 예외 발생 여부와 관계없이 파일이 자동으로 닫힙니다. 이것이 가장 안전한 파일 I/O 방법입니다.',
  },
  {
    id: 'python_007',
    category: 'python',
    question: '다음 예외 처리 코드의 출력 결과는?',
    code: `try:
    print(1/0)
except ZeroDivisionError:
    print("zero")
except Exception:
    print("exc")
else:
    print("ok")
finally:
    print("done")`,
    options: ['zero done', 'exc done', 'ok done', 'zero ok done'],
    answer: 0,
    explanation: '1/0은 ZeroDivisionError를 발생시키므로 "zero"가 출력됩니다. else는 예외가 없을 때만 실행되고, finally는 항상 실행되어 "done"이 출력됩니다.',
  },
  {
    id: 'python_008',
    category: 'python',
    question: 'Python의 내장함수 map()에 대한 설명으로 올바른 것은?',
    code: `result = map(int, ['1', '2', '3'])`,
    options: [
      'result는 즉시 [1, 2, 3] 리스트를 반환한다',
      'result는 map 객체(이터레이터)를 반환한다',
      'map()은 두 개의 인자만 받을 수 있다',
      '문자열 리스트에는 사용할 수 없다',
    ],
    answer: 1,
    explanation: 'map()은 map 객체(지연 평가 이터레이터)를 반환합니다. 결과를 리스트로 사용하려면 list(map(int, [\'1\',\'2\',\'3\']))처럼 변환해야 합니다.',
  },
  {
    id: 'python_009',
    category: 'python',
    question: '다음 데코레이터 코드의 출력 결과는?',
    code: `def deco(func):
    def wrapper():
        print("before")
        func()
        print("after")
    return wrapper

@deco
def hello():
    print("hello")

hello()`,
    options: ['hello', 'before hello after', 'before after', 'before hello'],
    answer: 1,
    explanation: '@deco는 hello = deco(hello)와 동일합니다. hello()를 호출하면 wrapper()가 실행되어 "before" → func()(hello 본체) → "after" 순으로 출력됩니다.',
  },
  {
    id: 'python_010',
    category: 'python',
    question: "다음 중 Python 모듈 import 방법으로 틀린 것은?",
    options: [
      'import math',
      'from math import sqrt',
      'import math as m',
      'import from math sqrt',
    ],
    answer: 3,
    explanation: '"import from math sqrt"는 잘못된 문법입니다. 올바른 형태는 "from math import sqrt"입니다. import, from...import, import...as 세 가지 방식이 유효합니다.',
  },

  // ─── LINUX (10문제) ──────────────────────────────────────────────
  {
    id: 'linux_001',
    category: 'linux',
    question: '다음 중 현재 디렉토리의 숨김 파일을 포함한 상세 목록을 출력하는 명령어는?',
    options: ['ls -l', 'ls -a', 'ls -la', 'ls -r'],
    answer: 2,
    explanation: 'ls -la 는 -l(long format, 상세 정보)과 -a(all, 숨김 파일 포함)를 조합한 것입니다. 숨김 파일은 .으로 시작합니다.',
  },
  {
    id: 'linux_002',
    category: 'linux',
    question: '다음 chmod 명령어로 설정되는 파일 권한은?',
    code: `chmod 755 script.sh`,
    options: [
      'rwxr-xr-x',
      'rwxrwxrwx',
      'rw-r--r--',
      'rwx------',
    ],
    answer: 0,
    explanation: '755 = 7(rwx) 5(r-x) 5(r-x). 소유자는 읽기/쓰기/실행, 그룹과 기타는 읽기/실행 권한입니다.',
  },
  {
    id: 'linux_003',
    category: 'linux',
    question: '다음 명령어의 결과로 올바른 것은?',
    code: `ps aux | grep nginx`,
    options: [
      'nginx 프로세스를 종료한다',
      'nginx 설정 파일을 검색한다',
      'nginx 관련 실행 중인 프로세스를 출력한다',
      'nginx 패키지를 설치한다',
    ],
    answer: 2,
    explanation: 'ps aux는 실행 중인 모든 프로세스를 출력하고, 파이프(|)로 grep nginx에 전달하면 "nginx"를 포함하는 줄만 필터링합니다.',
  },
  {
    id: 'linux_004',
    category: 'linux',
    question: 'vi 에디터에서 현재 행을 삭제하는 명령은?',
    options: ['dd', 'yy', 'pp', 'u'],
    answer: 0,
    explanation: 'vi에서 dd는 현재 커서가 있는 행 전체를 삭제합니다. yy는 복사, p는 붙여넣기, u는 실행 취소(undo)입니다.',
  },
  {
    id: 'linux_005',
    category: 'linux',
    question: '다음 셸 스크립트의 출력 결과는?',
    code: `#!/bin/bash
for i in 1 2 3; do
  echo -n "$i "
done`,
    options: ['1 2 3', '1\n2\n3', '1 2 3 \n', '오류 발생'],
    answer: 0,
    explanation: 'echo -n은 줄바꿈 없이 출력합니다. for 루프가 1, 2, 3을 순서대로 출력하므로 "1 2 3 "이 한 줄에 출력됩니다(끝에 공백 포함).',
  },
  {
    id: 'linux_006',
    category: 'linux',
    question: '다음 중 리다이렉션에 대한 설명으로 올바른 것은?',
    code: `ls -l > output.txt 2>&1`,
    options: [
      '표준 출력만 output.txt에 저장한다',
      '표준 오류만 output.txt에 저장한다',
      '표준 출력과 표준 오류 모두 output.txt에 저장한다',
      'output.txt 내용을 ls -l의 입력으로 사용한다',
    ],
    answer: 2,
    explanation: '>는 표준 출력(fd 1)을 파일로 리다이렉션하고, 2>&1은 표준 오류(fd 2)를 표준 출력(fd 1)과 같은 곳으로 리다이렉션합니다.',
  },
  {
    id: 'linux_007',
    category: 'linux',
    question: 'Ubuntu/Debian 계열에서 패키지를 설치하는 명령어는?',
    options: [
      'yum install nginx',
      'apt install nginx',
      'rpm -i nginx',
      'pkg install nginx',
    ],
    answer: 1,
    explanation: 'Ubuntu/Debian 계열은 apt(Advanced Package Tool)를 사용합니다. yum/dnf는 Red Hat/CentOS 계열, rpm은 RPM 패키지 직접 설치, pkg는 FreeBSD용입니다.',
  },
  {
    id: 'linux_008',
    category: 'linux',
    question: '다음 grep 명령어에 대한 설명으로 올바른 것은?',
    code: `grep -rn "error" /var/log/`,
    options: [
      '/var/log/ 디렉토리에서 "error" 파일을 재귀적으로 삭제한다',
      '/var/log/ 디렉토리의 모든 파일을 재귀적으로 검색하여 "error" 포함 줄과 줄 번호를 출력한다',
      '"error" 문자열을 포함하는 디렉토리 이름을 출력한다',
      '/var/log/error 파일의 내용을 출력한다',
    ],
    answer: 1,
    explanation: 'grep -r은 재귀적 검색, -n은 줄 번호 표시 옵션입니다. 이 명령은 /var/log/ 하위 모든 파일에서 "error"가 있는 줄과 해당 줄 번호를 출력합니다.',
  },
  {
    id: 'linux_009',
    category: 'linux',
    question: '다음 중 파일을 압축 해제하는 명령어로 올바른 것은?',
    code: `archive.tar.gz`,
    options: [
      'tar -cvf archive.tar.gz',
      'tar -xvzf archive.tar.gz',
      'gzip archive.tar.gz',
      'zip -d archive.tar.gz',
    ],
    answer: 1,
    explanation: 'tar -xvzf: x(extract), v(verbose), z(gzip 처리), f(파일 지정). .tar.gz 파일을 압축 해제할 때 사용합니다. -c는 생성(create)입니다.',
  },
  {
    id: 'linux_010',
    category: 'linux',
    question: '현재 시스템의 네트워크 인터페이스 정보를 확인하는 명령어는?',
    options: ['netstat -an', 'ip addr show', 'ping localhost', 'route -n'],
    answer: 1,
    explanation: 'ip addr show(또는 ip a)는 네트워크 인터페이스의 IP 주소, MAC 주소 등을 확인하는 명령어입니다. ifconfig는 구버전 명령어로 현재 ip 명령어가 권장됩니다.',
  },

  // ─── SQL (10문제) ────────────────────────────────────────────────
  {
    id: 'sql_001',
    category: 'sql',
    question: '다음 SQL의 실행 결과로 올바른 것은? (employees 테이블: id, name, salary, dept_id)',
    code: `SELECT name, salary
FROM employees
WHERE salary >= 3000
  AND dept_id = 10
ORDER BY salary DESC;`,
    options: [
      'dept_id가 10이고 급여가 3000 이상인 직원을 급여 내림차순으로 조회',
      'dept_id가 10이거나 급여가 3000 이상인 직원을 조회',
      'dept_id가 10이고 급여가 3000 초과인 직원을 급여 오름차순으로 조회',
      '급여가 3000 이상인 전체 직원을 조회',
    ],
    answer: 0,
    explanation: 'AND 연산자는 두 조건 모두 만족해야 하며, >= 는 이상(포함), ORDER BY DESC는 내림차순입니다.',
  },
  {
    id: 'sql_002',
    category: 'sql',
    question: '다음 INNER JOIN 쿼리의 결과로 올바른 것은?',
    code: `SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;`,
    options: [
      '모든 직원과 모든 부서 정보를 조회',
      'dept_id가 일치하는 직원과 부서 정보만 조회',
      '직원이 없는 부서도 포함하여 조회',
      'dept_id가 NULL인 직원도 포함하여 조회',
    ],
    answer: 1,
    explanation: 'INNER JOIN은 ON 조건(e.dept_id = d.id)이 일치하는 행만 반환합니다. 조인 조건에 맞지 않는 행(dept_id가 NULL이거나 존재하지 않는 경우)은 제외됩니다.',
  },
  {
    id: 'sql_003',
    category: 'sql',
    question: '다음 쿼리에서 HAVING 절의 역할은?',
    code: `SELECT dept_id, AVG(salary) AS avg_sal
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 4000;`,
    options: [
      'salary가 4000 초과인 행만 그룹화에 포함',
      '그룹화 후 평균 급여가 4000 초과인 그룹만 반환',
      'WHERE절과 동일하게 개별 행을 필터링',
      'dept_id가 4000 초과인 부서만 출력',
    ],
    answer: 1,
    explanation: 'HAVING은 GROUP BY로 집계된 결과에 조건을 적용합니다. WHERE는 그룹화 이전 개별 행에 조건을 적용하고, HAVING은 집계 함수 결과에 조건을 적용합니다.',
  },
  {
    id: 'sql_004',
    category: 'sql',
    question: '다음 중 집계 함수와 그 기능이 잘못 연결된 것은?',
    options: [
      'COUNT(*) — 전체 행 수',
      'SUM(col) — 합계',
      'AVG(col) — 평균',
      'MAX(col) — 최솟값',
    ],
    answer: 3,
    explanation: 'MAX(col)은 최댓값을 반환합니다. 최솟값을 반환하는 함수는 MIN(col)입니다.',
  },
  {
    id: 'sql_005',
    category: 'sql',
    question: '다음 서브쿼리의 결과로 올바른 것은?',
    code: `SELECT name
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`,
    options: [
      '전체 직원의 평균 급여를 출력',
      '급여가 전체 평균보다 높은 직원의 이름을 출력',
      '급여가 가장 높은 직원의 이름을 출력',
      '서브쿼리는 SELECT절에만 사용 가능',
    ],
    answer: 1,
    explanation: 'WHERE 절의 서브쿼리 (SELECT AVG(salary) FROM employees)가 먼저 실행되어 전체 평균 급여를 계산하고, 그 값보다 salary가 큰 직원의 name을 반환합니다.',
  },
  {
    id: 'sql_006',
    category: 'sql',
    question: '다음 DDL 구문 중 기존 테이블에 컬럼을 추가하는 것은?',
    options: [
      'CREATE TABLE employees ADD COLUMN phone VARCHAR(20)',
      'ALTER TABLE employees ADD COLUMN phone VARCHAR(20)',
      'UPDATE TABLE employees ADD phone VARCHAR(20)',
      'MODIFY TABLE employees ADD COLUMN phone VARCHAR(20)',
    ],
    answer: 1,
    explanation: 'ALTER TABLE은 기존 테이블 구조를 변경하는 DDL 명령입니다. ADD COLUMN으로 새 컬럼을 추가하고, DROP COLUMN으로 삭제하며, MODIFY COLUMN으로 변경합니다.',
  },
  {
    id: 'sql_007',
    category: 'sql',
    question: '다음 DML 쿼리의 결과로 올바른 것은?',
    code: `UPDATE employees
SET salary = salary * 1.1
WHERE dept_id = 20;`,
    options: [
      'dept_id가 20인 직원을 삭제한다',
      'dept_id가 20인 직원의 급여를 10% 인상한다',
      'dept_id가 20인 새 직원을 추가한다',
      '전체 직원의 급여를 10% 인상한다',
    ],
    answer: 1,
    explanation: 'UPDATE ... SET ... WHERE 구문은 WHERE 조건에 맞는 행의 컬럼 값을 변경합니다. salary * 1.1은 현재 급여의 110%, 즉 10% 인상입니다.',
  },
  {
    id: 'sql_008',
    category: 'sql',
    question: '트랜잭션(Transaction)의 ACID 속성 중 "원자성(Atomicity)"의 의미는?',
    options: [
      '트랜잭션 실행 후 데이터가 일관된 상태를 유지',
      '트랜잭션의 모든 작업이 모두 완료되거나 모두 취소된다',
      '동시에 실행되는 트랜잭션이 서로 영향을 미치지 않는다',
      '커밋된 데이터는 영구적으로 저장된다',
    ],
    answer: 1,
    explanation: '원자성(Atomicity)은 트랜잭션 내의 작업이 전부 성공(COMMIT)하거나 전부 실패(ROLLBACK)해야 한다는 속성입니다. 일관성(C), 독립성(I), 지속성(D)도 ACID의 구성 요소입니다.',
  },
  {
    id: 'sql_009',
    category: 'sql',
    question: '인덱스(Index)에 대한 설명으로 틀린 것은?',
    options: [
      '인덱스를 사용하면 SELECT 쿼리의 검색 속도가 향상된다',
      '인덱스가 많을수록 INSERT/UPDATE/DELETE 성능이 저하될 수 있다',
      'PRIMARY KEY에는 자동으로 인덱스가 생성된다',
      '인덱스는 테이블 데이터와 별도로 저장되지 않는다',
    ],
    answer: 3,
    explanation: '인덱스는 테이블 데이터와 별도의 공간에 저장되는 자료구조입니다. B-Tree 등의 구조로 별도 저장되어 검색 속도를 높이지만 추가 저장 공간이 필요합니다.',
  },
  {
    id: 'sql_010',
    category: 'sql',
    question: '다음 VIEW에 대한 설명으로 올바른 것은?',
    code: `CREATE VIEW emp_view AS
SELECT id, name, dept_id
FROM employees
WHERE salary > 3000;`,
    options: [
      'VIEW는 데이터를 별도 테이블에 복사하여 저장한다',
      'VIEW는 가상 테이블로 쿼리 결과를 논리적으로 정의한다',
      'CREATE VIEW 실행 시 salary > 3000 조건은 무시된다',
      'VIEW는 SELECT만 가능하며 조건절을 포함할 수 없다',
    ],
    answer: 1,
    explanation: 'VIEW는 SELECT 쿼리를 저장한 가상 테이블입니다. 실제 데이터를 저장하지 않고, 조회 시마다 정의된 쿼리를 실행합니다. 조건절도 포함할 수 있습니다.',
  },
];

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'java',   label: 'Java',   color: 'bg-orange-100 text-orange-800' },
  { value: 'python', label: 'Python', color: 'bg-blue-100 text-blue-800' },
  { value: 'linux',  label: 'Linux',  color: 'bg-green-100 text-green-800' },
  { value: 'sql',    label: 'SQL',    color: 'bg-purple-100 text-purple-800' },
];

export const getQuestionsByCategory = (category: Category) =>
  questions.filter((q) => q.category === category);
