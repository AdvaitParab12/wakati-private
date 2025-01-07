import { useState } from "react";
import { Button, Textarea, Slider, Label } from "@/components/ui";
import { UploadCloud } from "lucide-react";

// Example frontend code snippet for integrating the API
const ReadTimeAPI = () => {
  const [text, setText] = useState("");
  const [readSpeed, setReadSpeed] = useState(238); // default WPM
  const [silentSpeed, setSilentSpeed] = useState(238); // default WPM
  const [response, setResponse] = useState(null); // Store API response here

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8787", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, wpm: readSpeed }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data); // Update UI with API response
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Input Text Section */}
      <div>
        <Label>Input Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
      </div>

      {/* Speed Sliders */}
      <div>
        <Label>Read Aloud Speed (WPM)</Label>
        <Slider value={readSpeed} onValueChange={setReadSpeed} min={50} max={1000} />
      </div>
      <div>
        <Label>Silent Reading Speed (WPM)</Label>
        <Slider value={silentSpeed} onValueChange={setSilentSpeed} min={50} max={1000} />
      </div>

      {/* Submit Button */}
      <Button onClick={handleSubmit}>Analyze Text</Button>

      {/* Display Results */}
      {response && (
        <div>
          <p>Read Time: {response.speed.seconds} seconds</p>
          <p>Readability Score: {response.readability.gradeLevel}</p>
          <p>Keywords:</p>
          <ul>
            {response.keywords.map(([word, count]) => (
              <li key={word}>{word}: {count}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReadTimeAPI;
