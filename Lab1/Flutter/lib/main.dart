import 'package:flutter/material.dart';

// Huvudfunktionen som startar appen
void main() => runApp(const MyApp());

// Huvudklassen för appen
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // Bygger appens övergripande struktur
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Ställer in temat för appen
      theme: ThemeData(
        brightness: Brightness.light, // Ljust tema
        primarySwatch: Colors.blue,  // Primärfärg för temat
      ),
      // Anger startsidan för appen
      home: const SinglePageApp(),
    );
  }
}

// StatelessWidget som representerar en sida i appen
class SinglePageApp extends StatefulWidget {
  const SinglePageApp({super.key});

  @override
  State<SinglePageApp> createState() => _SinglePageAppState();
}

// State för SinglePageApp för att hantera dess tillstånd
class _SinglePageAppState extends State<SinglePageApp> {
  late TextEditingController _textController; // Hanterar textinmatning i ett TextField

  // Initierar nödvändiga resurser vid start
  @override
  void initState() {
    super.initState();
    _textController = TextEditingController(text: ''); // Initierar TextEditingController
  }

  // Frigör resurser vid nedstängning
  @override
  void dispose() {
    _textController.dispose(); // Frigör TextEditingController
    super.dispose();
  }

  // Bygger gränssnittet för sidan
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lab1: Flutter on Android'), // Titel för AppBar
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start, // Justerar innehåll vertikalt
            crossAxisAlignment: CrossAxisAlignment.center, // Justerar innehåll horisontellt
            children: [
              SizedBox(
                width: 130,
                height: 90,
                child: Image.asset(
                  'assests/images/circle.png', // Söker efter en bild
                  errorBuilder: (context, error, stackTrace) {
                    return const Text('Image not found'); // Visar text om bilden saknas
                  },
                ),
              ),
              const SizedBox(height: 20), // Mellanrum mellan element

              // Rutnät med knappar
              SizedBox(
                height: 250, // Begränsar rutnätets höjd
                child: GridView(
                  shrinkWrap: true, // Gör att GridView anpassar sig till innehållet
                  padding: const EdgeInsets.all(1), // Inre marginal
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2, // Antal kolumner i rutnätet
                    childAspectRatio: 2, // Förhållandet mellan bredd och höjd för rutnätceller
                    crossAxisSpacing: 20, // Horisontell mellanrum mellan celler
                    mainAxisSpacing: 20, // Vertikal mellanrum mellan celler
                  ),
                  // Knappar i rutnätet
                  children: <Widget>[
                    ElevatedButton(
                      onPressed: () {}, // Åtgärd vid tryck
                      child: const Text('BUTTON'), // Text på knappen
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: const Text('BUTTON'),
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: const Text('BUTTON'),
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: const Text('BUTTON'),
                    ),
                  ],
                ),
              ),
              // Textfält för inmatning av text
              Padding(
                padding: const EdgeInsets.only(
                  top: 50, // Övre marginal
                  left: 20, // Vänster marginal
                  right: 20, // Höger marginal
                ),
                child: TextField(
                  controller: _textController, // Använder TextEditingController
                  decoration: const InputDecoration(
                    hintText: 'Email', // Platshållartext i textfältet
                    border: OutlineInputBorder(), // Anger en kantlinje
                    contentPadding: EdgeInsets.all(10), // Inre avstånd i textfältet
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
