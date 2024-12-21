import discord
from discord.ext import commands

bot = commands.Bot(command_prefix= '!', case_insensitive= True, intents= discord.Intents.all() )

@bot.event
async def on_ready():
    print(f"${bot.user.name} is online!")

    await bot.change_presence(
        status= discord.Status.idle,
        activity= discord.Activity(
            name= 'YOU',
            type= discord.ActivityType.watching
        )
    )


@bot.slash_command(name='ping')
async def ping(i):
    await i.response.send_message('Pong!')

bot.run() # Put your token in the brackets.