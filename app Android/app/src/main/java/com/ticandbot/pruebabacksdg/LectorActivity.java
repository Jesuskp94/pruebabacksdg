package com.ticandbot.pruebabacksdg;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class LectorActivity extends AppCompatActivity {

    private Button btn_registro;
    private boolean estado;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lector);

        btn_registro = findViewById(R.id.btn_registro);
        estado = false;


        btn_registro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                btn_registro.setText(textoBoton());
            }
        });

    }

    public String textoBoton()
    {
        String texto;
        if(estado) {
            texto = "@string/desanotarse";
        } else {
            texto = "@string/anotarse";
        }
        estado = !estado;
        return texto;
    }



    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.menu_lector, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.cambiarPublicador:
                Toast.makeText(this, "Has pulsado en settings //TODO: por terminar", Toast.LENGTH_SHORT).show();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}