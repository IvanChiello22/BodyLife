"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Target, Wrench } from "lucide-react"

interface VideoTutorialScreenProps {
  exerciseId: string
  onBack: () => void
}

export function VideoTutorialScreen({ exerciseId, onBack }: VideoTutorialScreenProps) {
  const getExerciseData = (id: string) => {
    const exercises = {
      // PUSH DAY EXERCISES
      "bench-press": {
        name: "Bench Press",
        emoji: "💪",
        difficulty: "Intermedio",
        targetMuscles: ["Petto", "Tricipiti", "Spalle"],
        equipment: ["Bilanciere", "Panca"],
        duration: "45-60 min",
        description: "Esercizio fondamentale per lo sviluppo del petto e della forza della parte superiore del corpo.",
        instructions: [
          "Sdraiati sulla panca con i piedi ben piantati a terra",
          "Afferra il bilanciere con una presa leggermente più larga delle spalle",
          "Abbassa il bilanciere al petto in modo controllato",
          "Spingi il bilanciere verso l'alto fino a estendere completamente le braccia",
          "Ripeti per il numero desiderato di ripetizioni",
        ],
        videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
      },
      "shoulder-press": {
        name: "Shoulder Press",
        emoji: "🏋️",
        difficulty: "Intermedio",
        targetMuscles: ["Spalle", "Tricipiti"],
        equipment: ["Manubri", "Bilanciere"],
        duration: "30-45 min",
        description: "Esercizio per sviluppare la forza e la massa delle spalle.",
        instructions: [
          "Siediti su una panca con schienale verticale",
          "Afferra i manubri e posizionali all'altezza delle spalle",
          "Spingi i pesi verso l'alto fino a estendere completamente le braccia",
          "Abbassa lentamente i pesi alla posizione di partenza",
          "Mantieni il core contratto durante tutto il movimento",
        ],
        videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog",
      },
      "tricep-dips": {
        name: "Tricep Dips",
        emoji: "💪",
        difficulty: "Intermedio",
        targetMuscles: ["Tricipiti", "Spalle", "Petto"],
        equipment: ["Panca", "Sedia"],
        duration: "25-35 min",
        description: "Esercizio mirato per lo sviluppo dei tricipiti utilizzando il peso corporeo.",
        instructions: [
          "Siediti sul bordo di una panca con le mani afferrate ai lati",
          "Sposta il corpo in avanti fuori dalla panca",
          "Scendi piegando i gomiti fino a formare un angolo di 90 gradi",
          "Spingi verso l'alto estendendo completamente le braccia",
          "Mantieni i gomiti vicini al corpo durante il movimento",
        ],
        videoUrl: "https://www.youtube.com/embed/6kALZikXxLc",
      },
      "push-ups": {
        name: "Push-ups",
        emoji: "💥",
        difficulty: "Principiante",
        targetMuscles: ["Petto", "Tricipiti", "Spalle", "Core"],
        equipment: ["Nessuno"],
        duration: "20-30 min",
        description: "Esercizio a corpo libero fondamentale per la parte superiore del corpo.",
        instructions: [
          "Posizionati in plank con le mani alla larghezza delle spalle",
          "Mantieni il corpo in linea retta dalla testa ai piedi",
          "Scendi piegando i gomiti fino a toccare il petto a terra",
          "Spingi verso l'alto tornando alla posizione di partenza",
          "Mantieni il core contratto per tutta la durata",
        ],
        videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
      },
      "incline-bench-press": {
        name: "Incline Bench Press",
        emoji: "💪",
        difficulty: "Intermedio",
        targetMuscles: ["Petto Alto", "Spalle", "Tricipiti"],
        equipment: ["Bilanciere", "Panca Inclinata"],
        duration: "40-50 min",
        description: "Variante del bench press per sviluppare la parte alta del petto.",
        instructions: [
          "Regola la panca a 30-45 gradi di inclinazione",
          "Sdraiati sulla panca con i piedi ben piantati",
          "Afferra il bilanciere con presa leggermente più larga delle spalle",
          "Abbassa il bilanciere alla parte alta del petto",
          "Spingi verso l'alto seguendo l'angolo della panca",
        ],
        videoUrl: "https://www.youtube.com/embed/DbFgADa2PL8",
      },
      "lateral-raises": {
        name: "Lateral Raises",
        emoji: "🔥",
        difficulty: "Principiante",
        targetMuscles: ["Spalle Laterali"],
        equipment: ["Manubri"],
        duration: "20-30 min",
        description: "Esercizio di isolamento per sviluppare la larghezza delle spalle.",
        instructions: [
          "Stai in piedi con un manubrio in ogni mano",
          "Mantieni le braccia leggermente piegate",
          "Solleva i manubri lateralmente fino all'altezza delle spalle",
          "Abbassa lentamente i pesi alla posizione di partenza",
          "Controlla il movimento evitando di usare lo slancio",
        ],
        videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
      },
      "overhead-press": {
        name: "Overhead Press",
        emoji: "🏋️",
        difficulty: "Avanzato",
        targetMuscles: ["Spalle", "Core", "Tricipiti"],
        equipment: ["Bilanciere"],
        duration: "45-60 min",
        description: "Esercizio completo per sviluppare forza e stabilità delle spalle.",
        instructions: [
          "Stai in piedi con il bilanciere appoggiato sulle spalle",
          "Mantieni i piedi alla larghezza delle spalle",
          "Spingi il bilanciere verso l'alto sopra la testa",
          "Estendi completamente le braccia mantenendo il core contratto",
          "Abbassa il bilanciere lentamente alla posizione di partenza",
        ],
        videoUrl: "https://www.youtube.com/embed/2yjwXTZQDDI",
      },
      "tricep-extensions": {
        name: "Tricep Extensions",
        emoji: "💪",
        difficulty: "Intermedio",
        targetMuscles: ["Tricipiti"],
        equipment: ["Manubri", "Bilanciere EZ"],
        duration: "25-35 min",
        description: "Esercizio di isolamento per lo sviluppo dei tricipiti.",
        instructions: [
          "Sdraiati su una panca con un peso sopra il petto",
          "Mantieni i gomiti fissi e piegali per abbassare il peso",
          "Estendi le braccia per tornare alla posizione di partenza",
          "Concentrati sul movimento solo degli avambracci",
          "Mantieni i gomiti stabili durante tutto l'esercizio",
        ],
        videoUrl: "https://www.youtube.com/embed/d_KZxkY_0cM",
      },

      // LEG DAY EXERCISES
      squat: {
        name: "Squat",
        emoji: "🦵",
        difficulty: "Intermedio",
        targetMuscles: ["Quadricipiti", "Glutei", "Polpacci"],
        equipment: ["Bilanciere", "Rack"],
        duration: "45-60 min",
        description: "Esercizio fondamentale per lo sviluppo delle gambe e della forza funzionale.",
        instructions: [
          "Posiziona il bilanciere sulle spalle",
          "Mantieni i piedi alla larghezza delle spalle",
          "Scendi piegando le ginocchia fino a formare un angolo di 90 gradi",
          "Risali spingendo attraverso i talloni",
          "Mantieni la schiena dritta durante tutto il movimento",
        ],
        videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8",
      },
      "leg-press": {
        name: "Leg Press",
        emoji: "🦵",
        difficulty: "Principiante",
        targetMuscles: ["Quadricipiti", "Glutei"],
        equipment: ["Macchina Leg Press"],
        duration: "30-40 min",
        description: "Esercizio sicuro per sviluppare la forza delle gambe.",
        instructions: [
          "Siediti sulla macchina leg press",
          "Posiziona i piedi sulla pedana alla larghezza delle spalle",
          "Abbassa lentamente il peso piegando le ginocchia",
          "Spingi la pedana estendendo le gambe",
          "Non bloccare completamente le ginocchia in estensione",
        ],
        videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ",
      },
      lunges: {
        name: "Lunges",
        emoji: "🚶",
        difficulty: "Principiante",
        targetMuscles: ["Quadricipiti", "Glutei", "Femorali"],
        equipment: ["Nessuno"],
        duration: "30-40 min",
        description: "Esercizio unilaterale per lo sviluppo delle gambe e dell'equilibrio.",
        instructions: [
          "Parti in posizione eretta con i piedi alla larghezza delle spalle",
          "Fai un passo in avanti con una gamba",
          "Scendi piegando entrambe le ginocchia a 90 gradi",
          "Spingi con la gamba anteriore per tornare alla posizione di partenza",
          "Alterna le gambe o completa tutte le ripetizioni per lato",
        ],
        videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U",
      },
      "calf-raises": {
        name: "Calf Raises",
        emoji: "🦵",
        difficulty: "Principiante",
        targetMuscles: ["Polpacci"],
        equipment: ["Nessuno", "Manubri"],
        duration: "20-30 min",
        description: "Esercizio per sviluppare la forza e la definizione dei polpacci.",
        instructions: [
          "Stai in piedi con i piedi alla larghezza delle spalle",
          "Solleva i talloni contraendo i polpacci",
          "Mantieni la posizione per un secondo",
          "Abbassa lentamente i talloni alla posizione di partenza",
          "Puoi aggiungere peso per aumentare la difficoltà",
        ],
        videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI",
      },
      "romanian-deadlift": {
        name: "Romanian Deadlift",
        emoji: "🏋️",
        difficulty: "Intermedio",
        targetMuscles: ["Femorali", "Glutei", "Schiena Bassa"],
        equipment: ["Bilanciere", "Manubri"],
        duration: "40-50 min",
        description: "Variante del deadlift che enfatizza i muscoli posteriori della coscia.",
        instructions: [
          "Stai in piedi con il bilanciere davanti alle cosce",
          "Mantieni le ginocchia leggermente piegate",
          "Piega i fianchi spingendo il sedere indietro",
          "Abbassa il bilanciere lungo le gambe",
          "Torna alla posizione eretta contraendo glutei e femorali",
        ],
        videoUrl: "https://www.youtube.com/embed/jEy_czb3RKA",
      },
      "leg-curls": {
        name: "Leg Curls",
        emoji: "🦵",
        difficulty: "Principiante",
        targetMuscles: ["Femorali"],
        equipment: ["Macchina Leg Curl"],
        duration: "25-35 min",
        description: "Esercizio di isolamento per i muscoli posteriori della coscia.",
        instructions: [
          "Sdraiati a pancia in giù sulla macchina",
          "Posiziona le caviglie sotto i rulli",
          "Piega le ginocchia portando i talloni verso i glutei",
          "Contrai i femorali nella posizione di massima contrazione",
          "Abbassa lentamente le gambe alla posizione di partenza",
        ],
        videoUrl: "https://www.youtube.com/embed/ELOCsoDSmrg",
      },
      "bulgarian-split-squat": {
        name: "Bulgarian Split Squat",
        emoji: "🚶",
        difficulty: "Intermedio",
        targetMuscles: ["Quadricipiti", "Glutei"],
        equipment: ["Panca"],
        duration: "35-45 min",
        description: "Esercizio unilaterale avanzato per lo sviluppo delle gambe.",
        instructions: [
          "Posiziona un piede su una panca dietro di te",
          "L'altro piede deve essere ben piantato davanti",
          "Scendi piegando la gamba anteriore",
          "Mantieni il busto eretto durante il movimento",
          "Spingi attraverso il tallone per tornare su",
        ],
        videoUrl: "https://www.youtube.com/embed/2C-uNgKwPLE",
      },
      "hip-thrusts": {
        name: "Hip Thrusts",
        emoji: "🔥",
        difficulty: "Intermedio",
        targetMuscles: ["Glutei", "Femorali"],
        equipment: ["Panca", "Bilanciere"],
        duration: "30-40 min",
        description: "Esercizio specifico per lo sviluppo della forza e massa dei glutei.",
        instructions: [
          "Siediti con la schiena appoggiata a una panca",
          "Posiziona il bilanciere sui fianchi",
          "Pianta i piedi a terra alla larghezza delle spalle",
          "Spingi i fianchi verso l'alto contraendo i glutei",
          "Mantieni la posizione per un secondo prima di scendere",
        ],
        videoUrl: "https://www.youtube.com/embed/SEdqd1n0cvg",
      },

      // PULL DAY EXERCISES
      "lat-pulldown": {
        name: "Lat Pulldown",
        emoji: "💪",
        difficulty: "Principiante",
        targetMuscles: ["Dorsali", "Bicipiti", "Romboidi"],
        equipment: ["Macchina Lat Pulldown"],
        duration: "30-40 min",
        description: "Esercizio per sviluppare la larghezza della schiena.",
        instructions: [
          "Siediti alla macchina e afferra la barra con presa larga",
          "Inclina leggermente il busto all'indietro",
          "Tira la barra verso il petto contraendo le scapole",
          "Concentrati sul tirare con i dorsali, non con le braccia",
          "Rilascia lentamente la barra alla posizione di partenza",
        ],
        videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc",
      },
      "barbell-rows": {
        name: "Barbell Rows",
        emoji: "🏋️",
        difficulty: "Intermedio",
        targetMuscles: ["Dorsali", "Romboidi", "Trapezi"],
        equipment: ["Bilanciere"],
        duration: "40-50 min",
        description: "Esercizio fondamentale per lo sviluppo dello spessore della schiena.",
        instructions: [
          "Stai in piedi con il bilanciere davanti a te",
          "Piega i fianchi mantenendo la schiena dritta",
          "Afferra il bilanciere con presa prona",
          "Tira il bilanciere verso l'addome",
          "Contrai le scapole nella posizione finale",
        ],
        videoUrl: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
      },
      "face-pulls": {
        name: "Face Pulls",
        emoji: "💪",
        difficulty: "Principiante",
        targetMuscles: ["Deltoidi Posteriori", "Trapezi", "Romboidi"],
        equipment: ["Cavi", "Elastici"],
        duration: "20-30 min",
        description: "Esercizio per la salute delle spalle e la postura.",
        instructions: [
          "Imposta i cavi all'altezza del viso",
          "Afferra le maniglie con presa neutra",
          "Tira le maniglie verso il viso",
          "Separa le mani alla fine del movimento",
          "Concentrati sulla contrazione dei deltoidi posteriori",
        ],
        videoUrl: "https://www.youtube.com/embed/rep-qVOkqgk",
      },
      "bicep-curls": {
        name: "Bicep Curls",
        emoji: "💪",
        difficulty: "Principiante",
        targetMuscles: ["Bicipiti"],
        equipment: ["Manubri", "Bilanciere"],
        duration: "25-35 min",
        description: "Esercizio classico per lo sviluppo dei bicipiti.",
        instructions: [
          "Stai in piedi con un manubrio in ogni mano",
          "Mantieni i gomiti vicini al corpo",
          "Piega i gomiti sollevando i pesi",
          "Contrai i bicipiti nella posizione alta",
          "Abbassa lentamente i pesi controllando il movimento",
        ],
        videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
      },
      "pull-ups": {
        name: "Pull-ups",
        emoji: "🔥",
        difficulty: "Avanzato",
        targetMuscles: ["Dorsali", "Bicipiti", "Spalle"],
        equipment: ["Sbarra"],
        duration: "30-45 min",
        description: "Esercizio a corpo libero per sviluppare la forza della parte superiore del corpo.",
        instructions: [
          "Afferra la sbarra con presa prona, mani alla larghezza delle spalle",
          "Parti da posizione di completa estensione delle braccia",
          "Tira il corpo verso l'alto fino a portare il mento sopra la sbarra",
          "Scendi lentamente alla posizione di partenza",
          "Mantieni il core contratto durante tutto il movimento",
        ],
        videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
      },
      deadlift: {
        name: "Deadlift",
        emoji: "🏋️",
        difficulty: "Avanzato",
        targetMuscles: ["Schiena", "Glutei", "Femorali"],
        equipment: ["Bilanciere"],
        duration: "45-60 min",
        description: "Esercizio completo che coinvolge molti gruppi muscolari.",
        instructions: [
          "Posizionati davanti al bilanciere con i piedi alla larghezza delle spalle",
          "Afferra il bilanciere con presa mista o doppia",
          "Mantieni la schiena dritta e il petto in fuori",
          "Solleva il bilanciere estendendo le gambe e i fianchi",
          "Abbassa il bilanciere in modo controllato",
        ],
        videoUrl: "https://www.youtube.com/embed/op9kVnSso6Q",
      },
      "hammer-curls": {
        name: "Hammer Curls",
        emoji: "💪",
        difficulty: "Principiante",
        targetMuscles: ["Bicipiti", "Brachiali"],
        equipment: ["Manubri"],
        duration: "25-35 min",
        description: "Variante dei curl che enfatizza il brachiale e il brachioradiale.",
        instructions: [
          "Stai in piedi con un manubrio in ogni mano",
          "Mantieni i palmi rivolti verso il corpo",
          "Piega i gomiti sollevando i pesi",
          "Mantieni la presa neutra durante tutto il movimento",
          "Abbassa lentamente i pesi alla posizione di partenza",
        ],
        videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4",
      },
      "cable-rows": {
        name: "Cable Rows",
        emoji: "🔥",
        difficulty: "Principiante",
        targetMuscles: ["Dorsali", "Romboidi", "Trapezi Medi"],
        equipment: ["Cavi"],
        duration: "30-40 min",
        description: "Esercizio ai cavi per lo sviluppo della schiena.",
        instructions: [
          "Siediti alla macchina dei cavi con le gambe leggermente piegate",
          "Afferra la maniglia con entrambe le mani",
          "Tira la maniglia verso l'addome",
          "Contrai le scapole nella posizione finale",
          "Rilascia lentamente alla posizione di partenza",
        ],
        videoUrl: "https://www.youtube.com/embed/xQNrFHEMhI4",
      },

      // FULL BODY EXERCISES
      burpees: {
        name: "Burpees",
        emoji: "🔥",
        difficulty: "Avanzato",
        targetMuscles: ["Tutto il corpo"],
        equipment: ["Nessuno"],
        duration: "20-30 min",
        description: "Esercizio completo ad alta intensità che coinvolge tutto il corpo.",
        instructions: [
          "Parti in posizione eretta",
          "Scendi in squat e appoggia le mani a terra",
          "Salta indietro in posizione di plank",
          "Esegui un push-up (opzionale)",
          "Salta in avanti tornando in squat e poi salta in alto",
        ],
        videoUrl: "https://www.youtube.com/embed/TU8QYVW0gDU",
      },
      "mountain-climbers": {
        name: "Mountain Climbers",
        emoji: "⛰️",
        difficulty: "Intermedio",
        targetMuscles: ["Core", "Spalle", "Gambe"],
        equipment: ["Nessuno"],
        duration: "15-25 min",
        description: "Esercizio cardio dinamico che rafforza il core e migliora la resistenza.",
        instructions: [
          "Parti in posizione di plank alto",
          "Porta un ginocchio verso il petto",
          "Cambia rapidamente gamba in un movimento di corsa",
          "Mantieni i fianchi stabili e il core contratto",
          "Continua alternando le gambe a ritmo sostenuto",
        ],
        videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM",
      },
      plank: {
        name: "Plank",
        emoji: "🔥",
        difficulty: "Principiante",
        targetMuscles: ["Core", "Spalle", "Glutei"],
        equipment: ["Nessuno"],
        duration: "15-25 min",
        description: "Esercizio isometrico per rafforzare il core e migliorare la stabilità.",
        instructions: [
          "Posizionati a terra sui gomiti e sulle punte dei piedi",
          "Mantieni il corpo in linea retta dalla testa ai piedi",
          "Contrai gli addominali e i glutei",
          "Respira normalmente mantenendo la posizione",
          "Evita di alzare o abbassare i fianchi",
        ],
        videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c",
      },
      "jumping-jacks": {
        name: "Jumping Jacks",
        emoji: "⚡",
        difficulty: "Principiante",
        targetMuscles: ["Cardio", "Gambe", "Spalle"],
        equipment: ["Nessuno"],
        duration: "15-20 min",
        description: "Esercizio cardio classico per il riscaldamento e il condizionamento.",
        instructions: [
          "Parti in posizione eretta con i piedi uniti",
          "Salta aprendo le gambe e alzando le braccia sopra la testa",
          "Salta di nuovo chiudendo gambe e braccia",
          "Mantieni un ritmo costante e controllato",
          "Respira regolarmente durante l'esercizio",
        ],
        videoUrl: "https://www.youtube.com/embed/c4DAnQ6DtF8",
      },
    }

    return (
      exercises[id as keyof typeof exercises] || {
        name: "Esercizio",
        emoji: "💪",
        difficulty: "Intermedio",
        targetMuscles: ["Muscoli"],
        equipment: ["Attrezzatura"],
        duration: "30 min",
        description: "Descrizione dell'esercizio",
        instructions: ["Istruzione 1", "Istruzione 2"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      }
    )
  }

  const exercise = getExerciseData(exerciseId)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante":
        return "bg-green-500"
      case "Intermedio":
        return "bg-yellow-500"
      case "Avanzato":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-gray-800">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">{exercise.emoji}</span>
          {exercise.name}
        </h1>
        <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>{exercise.difficulty}</Badge>
      </div>

      <div className="p-4 space-y-6">
        {/* Video Player */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-0">
            <div className="aspect-video">
              <iframe
                src={exercise.videoUrl}
                title={exercise.name}
                className="w-full h-full rounded-t-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        {/* Exercise Info */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Informazioni Esercizio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">{exercise.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-white">Muscoli Target</p>
                  <p className="text-xs text-gray-400">{exercise.targetMuscles.join(", ")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-white">Attrezzatura</p>
                  <p className="text-xs text-gray-400">{exercise.equipment.join(", ")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-white">Durata</p>
                  <p className="text-xs text-gray-400">{exercise.duration}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Istruzioni</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
