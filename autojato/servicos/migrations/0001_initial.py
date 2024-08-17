# Generated by Django 5.0.4 on 2024-05-04 18:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0002_alter_carro_placa_alter_cliente_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriaManutencao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(choices=[('TVM', 'Trocar válcula do motor'), ('TO', 'Troca de óleo'), ('B', 'Balanceamento')], max_length=3)),
                ('preco', models.DecimalField(decimal_places=2, max_digits=8)),
            ],
        ),
        migrations.CreateModel(
            name='ServicoAdicional',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=50)),
                ('descricao', models.TextField()),
                ('preco', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Servico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=30)),
                ('data_inicio', models.DateField(null=True)),
                ('data_entrega', models.DateField(null=True)),
                ('finalizado', models.BooleanField(default=False)),
                ('protocole', models.CharField(blank=True, max_length=52, null=True)),
                ('identificador', models.CharField(blank=True, max_length=24, null=True)),
                ('categoria_manutencao', models.ManyToManyField(to='servicos.categoriamanutencao')),
                ('cliente', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='clientes.cliente')),
                ('servicos_adicionais', models.ManyToManyField(to='servicos.servicoadicional')),
            ],
        ),
    ]
