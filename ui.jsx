'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Book, Code, Users, Building2, UploadCloud, Briefcase, BarChartIcon as ChartBar } from 'lucide-react'

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1">
        <div className="container mx-auto p-6 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-4xl font-bold text-primary">Read time API</h1>
            <h2 className="text-2xl text-secondary-foreground">API</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">About Our API</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our Read Time API provides accurate estimations for content reading times, readability scores, 
                    and comprehensive text analysis. It's perfect for content creators, developers, educators, and anyone 
                    looking to optimize their written communication.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { label: "Read Time", value: formatTime(readAloudTime), unit: "min sec" },
                      { label: "Silent Time", value: formatTime(silentReadTime), unit: "min sec" },
                      { label: "Words", value: wordCount, unit: "total" },
                      { label: "Readability", value: readabilityScore, unit: "score" },
                      { label: "Sentences", value: sentenceCount, unit: "total" },
                      { label: "Syllables", value: syllableCount, unit: "total" },
                      { label: "Characters", value: characterCount, unit: "total" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="bg-secondary p-4 rounded-lg"
                      >
                        <Label className="text-secondary-foreground">{item.label}</Label>
                        <p className="text-2xl font-mono text-primary">{item.value}</p>
                        <p className="text-sm text-muted-foreground">{item.unit}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-lg text-primary">Input Text</Label>
                      <Textarea 
                        placeholder="Enter your text here..."
                        className="min-h-[150px] resize-none border-2 border-primary/20 focus:border-primary transition-colors"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          className="w-full border-2 border-primary/20 hover:bg-primary/10 transition-colors"
                          onClick={() => setText('')}
                        >
                          Clear
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-2 border-primary/20 hover:bg-primary/10 transition-colors"
                          onClick={() => {
                            // Implement file upload logic here
                            console.log('Upload text file');
                          }}
                        >
                          <UploadCloud className="w-4 h-4 mr-2" />
                          Upload Text
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-lg text-primary">Read Aloud Speed (words per minute)</Label>
                      <Slider
                        value={readSpeed}
                        onValueChange={setReadSpeed}
                        min={1}
                        max={1000}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1 wpm</span>
                        <span>{readSpeed} wpm</span>
                        <span>1000 wpm</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-lg text-primary">Silent Reading Speed (words per minute)</Label>
                      <Slider
                        value={silentSpeed}
                        onValueChange={setSilentSpeed}
                        min={1}
                        max={1000}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1 wpm</span>
                        <span>{silentSpeed} wpm</span>
                        <span>1000 wpm</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Top Keywords (Based on Word Repetition)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {topKeywords.map(({ word, count, percentage }) => (
                    <motion.div
                      key={word}
                      className="bg-secondary p-4 rounded-lg text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="font-semibold text-primary">{word}</span>
                      <p className="text-sm text-muted-foreground">{count} ({percentage}%)</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="py-12"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Who Uses Our API?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Book, title: "Educators", description: "Help students understand content complexity and estimate assignment reading times. Perfect for curriculum planning and content adaptation." },
                { icon: Code, title: "Developers", description: "Integrate reading time estimates and readability scores into your content management systems and applications for improved user experience." },
                { icon: Users, title: "Content Creators", description: "Optimize your content for better engagement by understanding reading times and complexity levels for your audience. Improve SEO and user retention." },
                { icon: Briefcase, title: "Business Professionals", description: "Enhance your business communications by ensuring your reports, presentations, and emails are clear, concise, and tailored to your audience's reading level." },
                { icon: Building2, title: "Government Agencies", description: "Ensure public communications are accessible to all citizens by analyzing and adjusting the readability of official documents and websites." },
                { icon: ChartBar, title: "Data Analysts", description: "Incorporate text complexity metrics into your data analysis workflows for more comprehensive insights on content performance and user engagement." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t bg-secondary">
        <div className="container mx-auto px-6 py-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-2 text-primary">API Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Reading Time Estimation</li>
                <li>Readability Scoring</li>
                <li>Word Count Analysis</li>
                <li>Content Complexity Metrics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Documentation</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>API Reference</li>
                <li>Integration Guide</li>
                <li>Examples</li>
                <li>SDK Downloads</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Resources</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Blog</li>
                <li>Case Studies</li>
                <li>Support</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Contact</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Email: support@example.com</li>
                <li>Twitter: @readtimeapi</li>
                <li>GitHub: github.com/readtime</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Read Time API. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
