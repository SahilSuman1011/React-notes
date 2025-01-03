// TypeScript Example: Greeting Function

// Define a type
type Person = {
    name: string;
    age: number;
  };
  
  // Function to greet a person
  function greet(person: Person): string {
    return `Hello, ${person.name}! You are ${person.age} years old.`;
  }
  
  // Usage
  const user: Person = { name: "Sahil", age: 22 };
  console.log(greet(user));
  