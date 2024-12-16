package com.example.lab1_k_c

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppContent()
        }
    }
}

@Composable
fun AppContent() {
    var isFocused by remember { mutableStateOf(false) }
    var email by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF2E8B57))
                .padding(15.dp)
        ) {
            Text(
                text = "Lab1: Kotlin + compose",
                fontSize = 25.sp,
                color = Color.White
            )
        }

        Image(
            painter = painterResource(id = R.drawable.circle),
            contentDescription = "Circle Image",
            modifier = Modifier
                .size(200.dp)
                .align(Alignment.CenterHorizontally)
                .padding(top = 40.dp)
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 40.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Row(modifier = Modifier.padding(vertical = 20.dp)) {
                ButtonComponent()
                Spacer(modifier = Modifier.width(20.dp))
                ButtonComponent()
            }
            Row(modifier = Modifier.padding(vertical = 20.dp)) {
                ButtonComponent()
                Spacer(modifier = Modifier.width(20.dp))
                ButtonComponent()
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Email",
                fontSize = 20.sp,
                color = Color.Black,
                modifier = Modifier.weight(1f)
            )
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                modifier = Modifier
                    .weight(2f)
                    .background(
                        color = Color.White
                    ),
                placeholder = { Text("Enter your email") },
                singleLine = true,
            )
        }
    }
}

@Composable
fun ButtonComponent() {
    Button(
        onClick = {},
        modifier = Modifier
            .padding(5.dp),
        colors = androidx.compose.material3.ButtonDefaults.buttonColors(
            containerColor = Color.Gray,  // Background color
            contentColor = Color.Black    // Text color
        )
    ) {
        Text(
            text = "BUTTON",
            fontSize = 16.sp,
            color = Color.Black
        )
    }
}
